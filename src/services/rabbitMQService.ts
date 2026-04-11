import { Channel, ConsumeMessage, Options } from "amqplib";
import rabbit from "../utils/rabbitmq";
import { Invites, InviteStatus } from "../@types";
import Invite from "../models";
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

  public receive = async (exchange: string, type: string) => {
    rabbit.connectRabbitMQ();

    const channel = rabbit.getChannel();

    const q = await channel.assertQueue("convites", {});

    channel.prefetch(1);

    console.log(
      " [*] Waiting for messages in %s. To exit press CTRL+C",
      q.queue,
    );
    channel.bindQueue(q.queue, exchange, "");

    channel.consume(q.queue, async (msg) => {
      if (msg === null) return;

      this.handleMessageAndSaveToDatabase(msg, channel);
    });
  };

  async handleMessageAndSaveToDatabase(msg: ConsumeMessage, channel: Channel) {
    try {
      const serialization = JSON.parse(msg.content.toString()) as Invites;
      const status: InviteStatus = InviteStatus.pending;

      console.log("[v] Processando:", serialization);

      serialization.status = status;

      await Invite.insertOne(serialization as any);

      channel.ack(msg);
      console.log("[x] Salvo no banco e confirmado!");
    } catch (error) {
      console.error("[!] Erro ao processar mensagem:", error);

      // Em caso de erro, decide se re-enfileira (true) ou descarta (false)
      // Cuidado com loops infinitos de erro!
      channel.nack(msg, false, true);
    }
  }
}

export default new RabbitMQService();
