import { InviteService } from "../services/Invite.service";

export class InviteController {
    private inviteservice: InviteService;
    constructor() {
        this.inviteservice = new InviteService();
    }
    GetRecieverInvites(reciever_id: number) {
        return this.inviteservice.GetRecieverInvites(reciever_id);
    }
    GetSenderInvites(sender_id:number) {
        return this.inviteservice.GetSenderInvites(sender_id);
    }
    addInvite(reciever_id:number, sender_id:number) {
        return this.inviteservice.addInvite(reciever_id, sender_id);
    }
}
