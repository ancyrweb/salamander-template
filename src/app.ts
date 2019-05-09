import { GraphQLDateTime } from "graphql-iso-date";

import Authenticator from "salamander/dist/middleware/Authenticator";
import App from "salamander/dist/kernel/App";
import Logger from "salamander/dist/service/Logger";
import ORM from "salamander/dist/service/ORM";
import Mailer from "salamander/dist/service/Mailer";
import Validator from "salamander/dist/service/Validator";
import ExpressRouter from "salamander/dist/router/ExpressRouter";
import GraphQLRouter from "salamander/dist/router/GraphQLRouter";
import Templating from "salamander/dist/service/Templating";
import { configurable } from "salamander/dist/helper";

import config from "../config/config";
import AuthController from "./controller/AuthController";

const createMailerConfig = config => {
  return [
    {
      host: config.parameters.SMTP_HOST,
      port: config.parameters.SMTP_PORT,
      secure: false,
      auth: config.parameters.SMTP_AUTH
    }
  ];
};

export default (env: "production" | "development" | "test") => {
  const authenticator = new Authenticator({
    authenticate: async (req, context) => {
      if (
        req.headers.authorization &&
        req.headers.authorization.indexOf("Bearer") === 0
      ) {

      }
    },
    hasRole: (user, role) => {
      return false;
    }
  });

  return App.configure({
    config: config,
    logger: new Logger({
      env: config.parameters.ENV,
      ...config.logger
    }),
    controllers: [
      new AuthController(),
    ],
    services: [
      ORM,
      configurable(Mailer, createMailerConfig),
      Validator,
      Templating
    ],
    middlewares: [authenticator.toMiddleware()],
    routers: [
      new GraphQLRouter({
        schemaPath: __dirname + "/schema",
        directives: {
          authenticated: authenticator.toAuthenticatedDirective(),
          requireRole: authenticator.toRequireRoleDirective()
        },
        types: {
          DateTime: GraphQLDateTime
        }
      }),
      new ExpressRouter({
        views: config.paths.views,
        public: config.paths.public
      })
    ]
  });
};
