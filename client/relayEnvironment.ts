import 'isomorphic-unfetch';
import { authMiddleware, RelayNetworkLayer, urlMiddleware } from 'react-relay-network-modern';
import RelayClientSSR from 'react-relay-network-modern-ssr/lib/client';
import RelayServerSSR from 'react-relay-network-modern-ssr/lib/server';
import { Environment, RecordSource, Store } from 'relay-runtime';

const __SERVER__ = !process['browser'];

export function createRelayEnvironment(relaySsr, store, url): Environment {
  const env = new Environment({
    network: new RelayNetworkLayer([
      relaySsr.getMiddleware(),
      urlMiddleware({ url }),
      authMiddleware({
        allowEmptyToken: true,
        token: () => {
          return store.jwt;
        },
        tokenRefreshPromise: req => {
          if (!__SERVER__) {
            console.log('[client.js] resolve token refresh', req);
            return null;
            // return fetch('/jwt/refresh')
            //   .then(res => res.json())
            //   .then(json => {
            //     const token = json.token;
            //     store.jwt = token;
            //     return token;
            //   })
            //   .catch(err => console.log('[client.js] ERROR can not refresh token', err));
          }
        },
      }),
    ]),
    store: new Store(new RecordSource()),
  });
  store.relayEnvironment = env;
  return env;
}

let env;
export function getClientRelay(store, data): Environment {
  if (__SERVER__) throw new Error('getClientRelay called from server');
  if (env) return env;
  const relaySsr = new RelayClientSSR(data);
  env = createRelayEnvironment(relaySsr, store, `http://localhost:3000/graphql`);
  return env;
}

export function newServerRelay(store): Environment {
  if (!__SERVER__) throw new Error('newServerRelay called from client');
  const relaySsr = new RelayServerSSR();
  const relayEnvironment = createRelayEnvironment(relaySsr, store, `http://localhost:3000/graphql`);
  relayEnvironment['relaySSRMiddleware'] = relaySsr;
  return relayEnvironment;
}
