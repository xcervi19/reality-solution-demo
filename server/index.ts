import 'reflect-metadata';
import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';

export interface NextAppProps {
  dev: boolean,
  port: number,
  protocol: 'http' | 'https',
  domain: string,
  serverIp: string
}

export interface ApplyMiddlewareCallback {
  (app: any, server: express.Express): void, // TODO otypovat
}

const prepareAppAndServer = async ({
  dev,
  port,
  serverIp,
}: NextAppProps, applyMiddleware: ApplyMiddlewareCallback): Promise<any> => {

  const app = next({ dev });
  const handle = app.getRequestHandler();
  await app.prepare();
  const server = express();

    /**bodyParser.json(options)
   * Parses the text as JSON and exposes the resulting object on req.body.
   */
  server.use(bodyParser.json({ type: "application/json" }));

  if (applyMiddleware) {
    applyMiddleware(app, server);
  }
  
  server.get('/getexample', (req, res) => res.send('Hello World!'));

  server.get('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(port, serverIp, () => {
    console.log(`APP is ready as ${process.env.PROTOCOL}://${process.env.DOMAIN} on ${serverIp}`);
  });

  return {
    server,
    app,
  };
}

export {
  prepareAppAndServer,
};
