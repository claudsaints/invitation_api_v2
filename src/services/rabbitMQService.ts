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

  public receive = async (exchange: string, type: string, ) => {
    rabbit.connectRabbitMQ();
    
    const channel = rabbit.getChannel();

    await channel.assertExchange(exchange, type);

    const q = await channel.assertQueue("convites", {});

    console.log(
      " [*] Waiting for messages in %s. To exit press CTRL+C",
      q.queue,
    );
    channel.bindQueue(q.queue, exchange, "");

    channel.consume(
      q.queue,
      function (msg) {
        if (msg === null) return; 
        
        console.log(" [x] %s", msg.content.toString());
      },
      {
        noAck: false,
      },
    );
  };
}

export default new RabbitMQService;
