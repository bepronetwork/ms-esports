import GoogleStorageSingleton from './googleStorage';
import {ClientQueueSingleton,getWorkChannel,workConsume} from './rabbit';

export {
    GoogleStorageSingleton,
    ClientQueueSingleton,
    getWorkChannel,
    workConsume
}