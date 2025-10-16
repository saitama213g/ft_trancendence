import {DatabaseClient} from "./Database.client";
import {Invite} from "../models/Invite.model";
import {SentInvite} from "../models/Invite.model"
import {ReceivedInvite} from "../models/Invite.model"
import { stat } from "fs";

export class InviteRepository {
  private db = DatabaseClient.getConnection();

  getAllInvites(): Invite[]
  {
    return this.db.prepare("SELECT * FROM invites").all() as Invite[];
  }

  getSenderInvites(sender_id: number): SentInvite[] {
    const query = `
      SELECT 
        invites.id,
        invites.status,
        invites.receiver_id as recipient,
        users.username as recipientname,
        COALESCE(users.avatar_url, '/profile/default-avatar.svg') as recipientpicture,
        CURRENT_TIMESTAMP as sentAt
      FROM invites
      JOIN users ON invites.receiver_id = users.id
      WHERE invites.sender_id = ? AND invites.status = 'pending'
      ORDER BY invites.id DESC
    `;
    return this.db.prepare(query).all(sender_id) as SentInvite[];
  }

  getRecieverInvites(reciever_id: number): ReceivedInvite[] {
    const query = `
      SELECT 
        invites.id,
        invites.status,
        invites.sender_id as sender,
        users.username as sendername,
        COALESCE(users.avatar_url, '/profile/default-avatar.svg') as senderpicture,
        CURRENT_TIMESTAMP as sentAt
      FROM invites
      JOIN users ON invites.sender_id = users.id
      WHERE invites.receiver_id = ? AND invites.status = 'pending'
      ORDER BY invites.id DESC
    `;
    return this.db.prepare(query).all(reciever_id) as ReceivedInvite[];
  }

  updateStatus(sender_id: number, receiver_id: number, status: string): boolean {
    const result = this.db.prepare(
        `UPDATE invites SET status = ? WHERE sender_id = ? AND receiver_id = ?`
    ).run(status, sender_id, receiver_id);
    return result.changes > 0; // true if an invite was updated
  }


  addInvite(reciever_id:number, sender_id:number) : Invite {
    var prep = this.db.prepare("INSERT into invites (sender_id, receiver_id) VALUES (?, ?)");
    const result = prep.run(sender_id , reciever_id);
    const inserted = this.db.prepare("SELECT * FROM invites WHERE id = ?").get(result.lastInsertRowid);
    return inserted as Invite;
  }

  inviteExists(sender_id: number, receiver_id: number): boolean {
    const row = this.db.prepare(
        `SELECT 1 FROM invites WHERE sender_id = ? AND receiver_id = ?`
    ).get(sender_id, receiver_id);
    return !!row;
  }
}
