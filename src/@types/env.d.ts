declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGODB_URI: string;
    RABBITMQ_URL: string;
  }
}