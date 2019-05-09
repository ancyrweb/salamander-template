import "reflect-metadata";

import createApp from "./app";
import config from "../config/config";

(async () => {
  // @ts-ignore
  const app = await createApp(process.env.NODE_ENV);
  app.run(config.http.port);
})();
