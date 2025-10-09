import {DatabaseClient} from "./Database.client";
import {Invite} from "../models/Invite.model";
import { stat } from "fs";

export class InviteRepository {
  private db = DatabaseClient.getConnection();

  getAllInvites(): Invite[]
  {
    return this.db.prepare("SELECT * FROM invites").all() as Invite[];
  }

  getSenderInvites(sender_id: number): Invite[]
  {
    return this.db.prepare("SELECT * FROM invites WHERE sender_id = ?").all(sender_id) as Invite[];
  }

  getRecieverInvites(reciever_id: number): Invite[]
  {
    return this.db.prepare("SELECT * FROM invites WHERE receiver_id = ?").all(reciever_id) as Invite[];
  }

  updateStatus(sender_id: number, receiver_id: number, status: string): boolean {
    const result = this.db.prepare(
        `UPDATE invites SET status = ? WHERE sender_id = ? AND receiver_id = ?`
    ).run(status, sender_id, receiver_id);
    return result.changes > 0; // true if an invite was updated
}


  addInvite(sender_id:number, reciever_id:number) : Invite {
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
