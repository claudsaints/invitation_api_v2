import amqplib, { Channel } from "amqplib";

import dotenv from "dotenv";

dotenv.config();


const CONNECTION_RABBITMQ =
  process.env.RABBITMQ_URL || "http://localhost:15672";

console.log(CONNECTION_RABBITMQ);
class RabbitMQSetup {
  private RABBIT_URL: string;
  private connection!: amqplib.ChannelModel;
  private channel!: Channel;

  constructor(url: string) {
    this.RABBIT_URL = url;
  }

  public connectRabbitMQ = async (): Promise<void> => {
    try {
      this.connection = await amqplib.connect(this.RABBIT_URL);
      this.channel = await this.connection.createChannel();
      console.log("Connected to RabbitMq");
    } catch (error) {
      console.error("Failed to connect to RabbitMq", error);
      process.exit(1);
    }
  };

  public getChannel = (): Channel => {
    if (!this.channel) {
      throw new Error("RabbitMQ channel not initialized");
    }

    return this.channel;
  };

  public connectQueue = async (queueName: string) => {
    if (!this.channel) {
      throw new Error("RabbitMQ channel not initialized");
    }

    try {
      await this.channel.assertQueue(queueName, { durable: true });

      console.log("✅ Conectado ao RabbitMQ");
      return queueName;
    } catch (error) {
      console.error("❌ Erro ao conectar no RabbitMQ:", error);
    }
  };

  public closeRabbitMQ = async (): Promise<void> => {
    try {
      await this.channel.close();
      await this.connection.close();
    } catch (error) {
      console.error("Error closing RabbitMQ connection", error);
    }
  };
}

const rabbit = new RabbitMQSetup(CONNECTION_RABBITMQ);

export default rabbit;
