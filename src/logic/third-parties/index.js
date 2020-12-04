import GoogleStorageSingleton from './googleStorage';
import {ClientQueueSingleton, WorkRabbitMQ} from './rabbit';
import { LogOwlSingleton } from "./logOwl";

export {
    LogOwlSingleton,
    GoogleStorageSingleton,
    ClientQueueSingleton,
    WorkRabbitMQ
}