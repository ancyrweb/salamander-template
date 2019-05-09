import * as data from "../nodemon.json";
import DevRuntime from "salamander/dist/dev/DevRuntime";
import NodemonDevEnvironment from "salamander/dist/dev/NodemonDevEnvironment";

const runtime = new DevRuntime([new NodemonDevEnvironment(data)]);

runtime.start();
