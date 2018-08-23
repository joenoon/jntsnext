import { graphqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
// import compression from 'compression';
import cookieSession from 'cookie-session';
import cors from 'cors';
import express from 'express';
import { useStaticRendering } from 'mobx-react';
import nextJS from 'next';
import * as DB from './db';
import { Schema } from './schema';
import * as utils from './utils';

useStaticRendering(true);

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
if (isDev) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const nextApp = nextJS({ dev: isDev, dir: require('path').resolve(__dirname, '..') });
const nextHandle = nextApp.getRequestHandler();
nextApp['nextReady'] = nextApp.prepare();

const app = express();

// app.use(compression({threshold: 0}));
if (isDev) {
  app.set('json spaces', 4);
}

// start session

const secret = utils.JWT_SECRET;
const secure = false;
const origin = '*';

app.use(
  cookieSession({
    name: '__session',
    secret,
    path: '/',
    httpOnly: true,
    secure,
    signed: false,
    maxAge: 24 * 60 * 60 * 1000 * 365, // 1 year,
  })
);

app.use(
  cors({
    origin,
  })
);

app.use((req, res, next) => {
  let auth;

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    auth = req.headers.authorization.split(' ')[1];
  } else if (req.session.auth) {
    auth = req.session.auth;
  }
  // console.log('AUTH', req.originalUrl, auth);
  if (auth) {
    try {
      const decoded = utils.jwt.verify(auth, secret);
      // console.log(req.originalUrl, 'JWT:', decoded);
      req['jwt'] = decoded;
    } catch (err) {
      console.log('UNSET AUTH!', err);
      req.session = null as any;
    }
  }
  next();
});

// end session

// start graphql

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => {
    const jwt = req ? req['jwt'] : {};
    const extraContext: utils.Context = {
      request: req,
      getUser: async (): Promise<DB.UserInstance | null> => {
        const { extid } = extraContext;
        if (!extid) return null;
        return await DB.User.findOne({
          where: {
            extid,
          },
        });
      },
    };
    if (jwt) {
      extraContext.extid = jwt.extid;
    }
    // console.log({extraContext});
    return {
      schema: Schema,
      context: {
        req,
        ...extraContext,
      },
      ...(isDev
        ? {
            logFunction: ({ action, step, key, data }) => {
              return;
              if (key === 'query') {
                console.log(`QUERY START =============================================>`);
                console.log(data);
                console.log(`QUERY END =============================================>`);
              } else if (key === 'variables') {
                console.log(`VARIABLES START =============================================>`);
                console.log(JSON.stringify(data));
                console.log(`VARIABLES END =============================================>`);
              }
            },
          }
        : null),
    };
  })
);

// end graphql

// start nextjs

let nextReady = false;

app.get('*', async (req, res) => {
  if (!nextReady) {
    await nextApp['nextReady'];
    nextReady = true;
  }

  const { parse } = require('url');
  const parsedUrl = parse(req.url, true);
  const { pathname, query } = parsedUrl;

  const rootStaticFiles = ['/robots.txt', '/sitemap.xml', '/favicon.ico'];
  if (rootStaticFiles.indexOf(pathname) > -1) {
    res.send();
  } else if (pathname.indexOf('/_next/') === 0) {
    nextHandle(req, res, parsedUrl);
  } else {
    // rewrite all routes to /
    console.log('SERVE: ', pathname);
    await nextApp.render(req, res, '/', query);
  }
});

// end nextjs

const port = 3000;
if (port) {
  app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
  });
}

module.exports = app;
