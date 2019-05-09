import * as minimist from "minimist";
import parameters, { AppParametersType } from "./parameters";
import { StringMap } from "../src/typings/types";

const cliArgs = minimist(process.argv.slice(2));
const env = cliArgs.env || "dev";

const projectDir = __dirname + "/../";

export type AppConfigType = {
  http: {
    port: number,
  }
  orm: {
    synchronize: boolean,
    logging: boolean,

    entities: string[]
    migrations: string[],
    subscribers: string[],
    cli: {
      entitiesDir: string,
      migrationsDir: string,
      subscribersDir: string
    }
  },
  logger: {
    path: string,
    level: string,
  },
  paths: {
    views: string,
    public: string,
  }
  parameters: AppParametersType & {
    ENV: "dev" | "prod"
  },
  security: {
    accessTokenLifetime: number,
    refreshTokenlifetime: number,
  },
  roles: StringMap<number>,
  app: {
    expiredSessionDelayInSeconds: number
  }
}

export default {
  http: {
    port: 4998,
  },
  orm: {
    synchronize: true,
    logging: true,
    entities: [
      projectDir + "src/orm/entity/**/*.{ts,js}"
    ],
    migrations: [
      projectDir + "src/orm/migration/**/*.{ts,js}"
    ],
    subscribers: [
      projectDir + "src/orm/subscriber/**/*.{ts,js}"
    ],
    cli: {
      entitiesDir:  projectDir + "src/orm/entity",
      migrationsDir:  projectDir + "src/orm/migration",
      subscribersDir:  projectDir + "src/orm/subscriber"
    }
  },
  logger: {
    level: 'info',
    path: projectDir + "var/logs",
  },
  paths: {
    views: projectDir + 'views',
    public: projectDir + 'public'
  },
  parameters: {
    ENV: env,
    ...parameters,
  },
} as AppConfigType;
