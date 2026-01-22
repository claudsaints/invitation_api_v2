import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema({
    senderId: {type: String, required: true},
    receiverId: {type: String, required: true},
    receiverEmail: { type: String, required: true },
    status: {type: String, enum: ["pending", "accepted", "declined"], default: "pending"},
    createdAt: {type: Date, default: Date.now},

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