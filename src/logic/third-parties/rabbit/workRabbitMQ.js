const amqplib = require('amqplib');
import { RABBIT_URL_QUEUE_BET } from '../../../config';
var channelLocal = null;
function connect() {
    return amqplib.connect(RABBIT_URL_QUEUE_BET).then(conn => conn.createChannel());
}
function createQueue(channel, queue) {
    return new Promise((resolve, reject) => {
        try {
            channel.prefetch(1);
            channelLocal = channel;
            channel.assertQueue(queue, { durable: true, autoDelete: false });
            resolve(channel);
        }
        catch (err) { reject(err) }
    });
}
function consume(queue, callback) {
    connect()
        .then(channel => createQueue(channel, queue))
        .then(channel => { return channel.consume(queue, callback, { noAck: false }); })
        .catch(err => console.log(err));
}
function getChannel() {
    return channelLocal;
}
export {
    consume as workConsume,
    getChannel as getWorkChannel
}
//   consume("queue", (msg)=>{
//       setTimeout(()=>{
//         getChannel().ack(msg);
//       }, 10000)
//     console.log(msg.content.toString());
//   });