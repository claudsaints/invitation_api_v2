import mongoose from "mongoose";
import { InviteStatus } from "../@types";

const inviteSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  receiverEmail: { type: String, required: true },
  status: {
    type: String,
    enum: InviteStatus,
    default: "pending",
    required: true,
  },
  contextType: { type: String, required: true },
  contextId: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

const Invite = mongoose.model("Invite", inviteSchema);

export default Invite;

/*
POST EXAMPLE 
{
    "SenderId": "651631d86d630d7008801d9f",
    "ReceiverId": null,
    "ReceiverEmail": "joao.silva@email.com",
    "ContextId": "651631e28d630d7008801da1",
    "ContextType": "Projeto",
    "ExpiresAt": "2026-01-07T17:07:17"
}
*/
