enum InviteStatus {
  pending,
  accepted,
  declined,
}

interface Invites {
  senderId: string;
  receiverId: string;
  receiverEmail: string;
  expiresAt: string;
  contextType: string;
  contextId: string;
  status: InviteStatus
}

export { InviteStatus, Invites };
