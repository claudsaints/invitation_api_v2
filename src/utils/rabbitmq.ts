import amqplib, { Channel} from "amqplib";

const CONNECTION_RABBITMQ = process.env.RABBIRMQ_URL || "http://localhost:15672"

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
