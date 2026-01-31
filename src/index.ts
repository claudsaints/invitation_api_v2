import Express from "express";
import mongo from "mongoose";
import routes from "./routes/index";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const app = Express();

app.use(Express.json());
app.use(cors());
app.use(routes);

const URI = "mongodb://localhost:27017/invitation";

mongo
  .connect(URI)
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((error) => {
    throw Error(`Error on try to connect mongoDB: ${error}`);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
