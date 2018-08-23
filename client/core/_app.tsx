import { Provider as MobxProvider } from 'mobx-react';
import App, { AppComponentProps, Container } from 'next/app';
import NextRouter from 'next/dist/lib/router/router';
import Head from 'next/head';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { AppRegistry } from 'react-native';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { Environment } from 'relay-runtime';
import { getClientRelay, newServerRelay } from '../relayEnvironment';
import { getClientStore, newServerStore, Store } from '../store';

// null out next's router
NextRouter.prototype.onPopState = () => null;
NextRouter.prototype.changeState = () => null;

const __SERVER__ = !process['browser'];
const RRouter = __SERVER__ ? StaticRouter : BrowserRouter;

interface Props extends AppComponentProps {
  relayEnvironment: Environment;
  relayState: any;
  routerProps: any;
  store: Store;
  auth: string | null;
}

const OrigApp: any = App;

export default class MyApp extends App<Props> {
  store: Store;

  static async getInitialProps(ctx) {
    const { Component } = ctx;

    let appProps: any = {};
    if (OrigApp.getInitialProps) {
      appProps = await OrigApp.getInitialProps(ctx);
    }

    let relayState: any = null;
    let auth: any = null;
    let routerProps: any = null;
    let relayEnvironment: any = null;
    let store: any = null;

    if (__SERVER__) {
      const routerContext: any = {};
      try {
        const url = { query: ctx.ctx.query, pathname: ctx.pathname };
        routerProps = { location: ctx.ctx.req.originalUrl, context: routerContext };
        ctx.ctx.req.rr_routerContext = routerContext;

        // Run all GraphQL queries in the component tree
        // and extract the resulting data
        auth = ctx.ctx.req.session.auth;
        store = newServerStore();
        store.jwt = auth;
        relayEnvironment = newServerRelay(store);
        // Run all GraphQL queries
        const comp = (
          <MyApp
            {...appProps}
            Component={Component}
            relayState={relayState}
            relayEnvironment={relayEnvironment}
            routerProps={routerProps}
            store={store}
            router={{}}
          />
        );
        ReactDOMServer.renderToString(comp);
        relayState = await relayEnvironment.relaySSRMiddleware.getCache();

        // head side effect needs to be cleared manually
        const { getStyleElement } = AppRegistry.getApplication('Main', {});
        getStyleElement();
        Head.rewind();

        // If a shallow redirect occurs during first-pass rendering (pre-data-fetch), catch
        // that here and perform the redirect
        if (routerContext.url) {
          ctx.ctx.res.redirect(302, routerContext.url);
          ctx.ctx.res.finished = true;
          return {};
        }
      } catch (err) {
        // cleanup on bad error
        console.error(err);
        const { getStyleElement } = AppRegistry.getApplication('Main', {});
        getStyleElement();
        Head.rewind();
        ctx.ctx.res.redirect(302, routerContext.url || '/');
        ctx.ctx.res.finished = true;
        return {};
      }
    }

    return {
      ...appProps,
      routerProps,
      auth,
      relayState,
      relayEnvironment,
      store,
    };
  }

  constructor(props: Props) {
    super(props);
    this.store = props.store || getClientStore();
    if (props.auth) this.store.jwt = props.auth;
    if (!props.relayEnvironment) getClientRelay(this.store, props.relayState);
  }

  render() {
    const { Component, pageProps, routerProps } = this.props;
    const { store } = this;
    return (
      <Container>
        <MobxProvider store={store}>
          <RRouter {...routerProps}>
            <Component {...pageProps} />
          </RRouter>
        </MobxProvider>
      </Container>
    );
  }
}
