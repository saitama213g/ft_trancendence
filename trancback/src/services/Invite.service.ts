import {InviteRepository} from "../repositories/Invite.repository"
import {Invite} from "../models/Invite.model"

export class InviteService{
    private inviterepository:InviteRepository;
    constructor (){
        this.inviterepository = new InviteRepository();
    }

    GetRecieverInvites(reciever_id:number): Invite[]
    {
        return this.inviterepository.getRecieverInvites(reciever_id);
    }

    GetSenderInvites(sender_id:number): Invite[]
    {
        return this.inviterepository.getSenderInvites(sender_id);
    }

    addInvite(reciever_id:number, sender_id:number)
    {
        this.inviterepository.addInvite(reciever_id, sender_id);
    }
}
