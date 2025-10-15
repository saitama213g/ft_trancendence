export interface Invite {
    id: number;                            // Primary key
    sender_id: number;                     // References users.id
    receiver_id: number;                   // References users.id
    status : "pending" | "accepted" | "rejected"; // Default = 'pending'
}

export interface SentInvite {
  id: number;
  recipient: string;
  recipientname: string;
  recipientpicture: string;
  status: "pending" | "accepted" | "declined";
  sentAt: string;
}

export interface ReceivedInvite {
  id: number;
  sender: string;
  sendername: string;
  senderpicture: string;
  status: "pending" | "accepted" | "declined";
  sentAt: string;
}