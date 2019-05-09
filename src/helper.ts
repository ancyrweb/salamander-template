import App from "salamander/dist/kernel/App";
import ORM from "salamander/dist/service/ORM";
import Validable from "salamander/dist/service/Validable";
import Validator from "salamander/dist/service/Validator";
import LoggerInterface from "salamander/dist/service/LoggerInterface";
import Mailer from "salamander/dist/service/Mailer";
import Templating from "salamander/dist/service/Templating";

/*
 * Here are a list of helper functions that allow to access the framework
 * various services with a simple function call
 */
export const service = klass => App.getService(klass);
export const logger = (): LoggerInterface => App.logger;
export const mailer = (): Mailer => App.getService(Mailer);
export const server = () => App.app;
export const configurable = (klass, configure) => {
  klass.__smcfgr__ = configure;
  return klass;
};

export const parseTemplate = (path, data) => App.getService(Templating).parse(path, data);
export const url = () => App.url;
export const generateURL = (name, params) => App.getRouter(1).generateURL(name, params);
export const orm = () => App.getService(ORM) as ORM;
export const repository = type => orm().getRepository(type);
export const hydrate = (entity, obj): any => orm().connection.manager.create(entity, obj);
export const mergeIntoEntity = (entity, obj): any => {
  for (let key in obj) {
    entity[key] = obj[key];
  }
  return entity;
};

export const validator = () => App.getService(Validator) as Validator;
export const validateEntity = (
  entity: Validable,
  data: any,
  context?: object
) => validator().validate(entity, data, context);
