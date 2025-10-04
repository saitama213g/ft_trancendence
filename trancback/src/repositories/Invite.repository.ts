import {DatabaseClient} from "./Database.client";
import {Invite} from "../models/Invite.model";
import {User} from "../models/User.model";

export class InviteRepository {
  private db = DatabaseClient.getConnection();

  getSenderInvites(sender_id: number): Invite[]
  {
    return this.db.prepare("SELECT * FROM invites WHERE sender_id = ?").all(sender_id) as Invite[];
  }

  getRecieverInvites(reciever_id: number): Invite[]
  {
    return this.db.prepare("SELECT * FROM invites WHERE reciever_id = ?").all(reciever_id) as Invite[];
  }

  addInvite(sender_id:number , reciever_id:number) : Invite{
    var varii = this.db.prepare("INSERT into invites (sender_id, reciever_id) VALUES (?, ?)");
    const result = varii.run(sender_id , reciever_id);
    const inserted = this.db.prepare("SELECT * FROM invites WHERE id = ?").get(result.lastInsertRowid);
    return inserted as Invite;
  }
}
