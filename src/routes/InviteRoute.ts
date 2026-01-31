import { Router } from "express";
import InviteController from "../controllers/InviteController";

const routes = Router();

routes.post("/", InviteController.create);
routes.get("/:inviteId", InviteController.findById);
routes.get("/bySender/:senderId", InviteController.findAllBySender);
routes.get("/byReceiver/:receiverId", InviteController.findAllByReceiver);
routes.put("/:inviteId", InviteController.update);
routes.delete("/:inviteId", InviteController.delete);

export default routes;
