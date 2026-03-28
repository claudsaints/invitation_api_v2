import Express from "express";
import mongo from "mongoose";
import routes from "./routes/index";
import cors from "cors";
import rabbit from "./utils/rabbitmq";
const PORT = process.env.PORT || 3000;

const app = Express();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/invitation" ;

app.use(Express.json());
app.use(cors());
app.use(routes);

mongo
  .connect(MONGO_URI)
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((error) => {
    throw Error(`Error on try to connect mongoDB: ${error}`);
  });

rabbit.connectRabbitMQ();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  await rabbit.closeRabbitMQ();
  process.exit(0);
});
