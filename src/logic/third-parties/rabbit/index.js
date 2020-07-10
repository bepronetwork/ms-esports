 import {ClientQueueSingleton} from "./clientRabbitMQ.js";
 import {getWorkChannel, workConsume} from "./workRabbitMQ.js";

export {
    ClientQueueSingleton,
    getWorkChannel,
    workConsume
}