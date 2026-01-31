import { Response, Request } from "express";
import Invite from "../models";
import { InviteStatus } from "../@types";

/*
TODO

1 - EM METODOS FIND AJUSTAR RETORNO CASO NÃO ENCONTRE - ESTÁ RETORNANDO NULL
2 - ADICIONAR O CONTEXT PARA IDENTIFICAÇÃO ODOS PROJETOS   

 */
class InviteController {
  async create(req: Request, res: Response): Promise<Response> {
    const {
      senderId,
      receiverId,
      receiverEmail,
      expiresAt,
      contextType,
      contextId,
    } = req.body;

    const status: InviteStatus = 0;

    try {
      const data = await Invite.insertOne({
        senderId,
        receiverId,
        receiverEmail,
        expiresAt,
        status,
        contextType,
        contextId,
      });

      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({ message: "Error on create invite." });
    }
  }
  async findById(req: Request, res: Response): Promise<Response> {
    const { inviteId } = req.params;

    try {
      const invite = await Invite.findById(inviteId);

      if (!invite) {
        return res.status(401).json({ message: "Invite not found" });
      }

      return res.status(200).json(invite);
    } catch (error) {
      return res.status(500).json({ message: "Error on try to find invite" });
    }
  }
  async findAllBySender(req: Request, res: Response): Promise<Response> {
    const { senderId } = req.params;

    try {
      const invites = await Invite.find({ senderId });

      if (!invites) {
        return res.status(401).json({ message: "Invites not found" });
      }

      return res.status(200).json(invites);
    } catch (error) {
      return res.status(500).json({ message: "Error on try to find invites" });
    }
  }
  async findAllByReceiver(req: Request, res: Response): Promise<Response> {
    const { receiverId } = req.params;

    try {
      const invites = await Invite.find({ receiverId });

      if (!invites) {
        return res.status(401).json({ message: "Invites not found" });
      }

      return res.status(200).json(invites);
    } catch (error) {
      return res.status(500).json({ message: "Error on try to find invites" });
    }
  }
  async update(req: Request, res: Response): Promise<Response> {
    const { inviteId } = req.params;
    const { status } = req.body;

    try {
      const invite = await Invite.findByIdAndUpdate(inviteId, { status });

      return res.status(200).json(invite);
    } catch (error) {
      return res.status(500).json({ message: "Error on try to update" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { inviteId } = req.params;

    try {
      await Invite.findByIdAndDelete(inviteId);

      return res.status(200).json({ message: `Delete invite has success` });
    } catch (error) {
      return res.status(500).json({ message: "Error on try to delete" });
    }
  }
}

export default new InviteController();
