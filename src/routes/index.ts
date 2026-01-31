import { Router } from "express";
import InviteController from "../routes/InviteRoute";

const routes = Router();

routes.use("/invites", InviteController);

routes.use((_: any, res: any) =>
  res.json({ error: 'Requisição desconhecida' }),
);


export default routes;

