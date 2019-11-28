// poznamky
// nemam vyresenou bezpecnost -  je mozne se dostat do GraphQL ide
// pri SSR nemam cookies ... 
// neni hotva auth ...

import {
  prepareAppAndServer,
  NextAppProps,
  ApplyMiddlewareCallback,
} from './server/index';
import { prepareApiServer } from './server/apiServer';

const dev = process.env.NODE_ENV !== 'production';

const options: NextAppProps = {
  dev,
  port: 3000,
  protocol: 'http',
  domain: `localhost:3000`,
  serverIp: '127.0.0.1'
};

// @ts-ignore: Unreachable code error
const applyMiddleware: ApplyMiddlewareCallback = (app, server) => {
  // console.log(app);
  // console.log(server);
};

(
  async () => {
    await prepareAppAndServer(
      options,
      applyMiddleware,
    );
    await prepareApiServer({});
  }
)();
