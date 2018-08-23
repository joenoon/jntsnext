import Document, { Head, Main, NextScript } from 'next/document';
import * as React from 'react';
import { AppRegistry } from 'react-native';

const __SERVER__ = !process['browser'];

const normalizeNextElements = `
  #__next {
    height: 100%;
  }
  input, textarea {
    outline: none;
  }
`;

AppRegistry.registerComponent('Main', () => Main);

export default class MyDocument extends Document {
  static async getInitialProps(context) {
    const { getStyleElement } = AppRegistry.getApplication('Main', {});
    try {
      const props = await super.getInitialProps(context);

      // If a redirect occurs during full rendering server-side post-data-fetch, then we need to catch
      // that here and perform the redirect.
      if (__SERVER__ && context.req) {
        const routerContext = context.req.rr_routerContext;
        if (routerContext.url) {
          context.res.redirect(302, routerContext.url);
          context.res.finished = true;
          return {};
        }
      }

      const styles = React.Children.toArray([
        props.styles,
        <style dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
        getStyleElement(),
      ]);
      return {
        ...props,
        styles,
      };
    } catch (err) {
      getStyleElement();
      context.res.redirect(302, '/');
      context.res.finished = true;
      return {};
    }
  }

  constructor(props, context) {
    // remove anything that shouldn't be serialized into the html from props.__NEXT_DATA__.props here.
    const { relayEnvironment, auth, store, ...__NEXT_DATA__PROPS__ } = props.__NEXT_DATA__.props;
    props.__NEXT_DATA__.props = __NEXT_DATA__PROPS__;
    super(props, context);
  }

  render() {
    return (
      <html lang="en" style={{ height: '100%' }}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="Content-Language" content="en" />
        </Head>
        <body style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, overflowX: 'hidden' }}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
