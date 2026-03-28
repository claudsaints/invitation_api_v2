import { Options } from "amqplib";
import rabbit from "../utils/rabbitmq";

interface QueueTypes {
  durable: boolean;
  arguments: {
    "x-queue-type": string;
  };
}

class RabbitMQService {
  public producer = async (
    exchange: string,
    routingKey: string,
    content: Buffer<ArrayBufferLike>,
    options?: Options.Publish,
  ) => {
    const channel = rabbit.getChannel();

    channel.publish(exchange, routingKey, content, options);

    // channel.sendToQueue(queue, Buffer.from(msg));
    // console.log(" [x] Sent %s", msg);

    //     setTimeout(function() {
    //   connection.close();
    //   process.exit(0)
    // }, 500);
  };
  public consuming = async () => {};
}
