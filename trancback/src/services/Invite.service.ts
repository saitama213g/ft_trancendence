import {InviteRepository} from "../repositories/Invite.repository"
import {Invite} from "../models/Invite.model"
import {FriendRepository} from "../repositories/Friend.repository"

export class InviteService{
    private inviterepository = new InviteRepository();
    private friendRepo = new FriendRepository();

    getAllInvites(): Invite[]
    {
        return this.inviterepository.getAllInvites();
    }

    GetRecieverInvites(reciever_id:number): Invite[]
    {
        return this.inviterepository.getRecieverInvites(reciever_id);
    }

    GetSenderInvites(sender_id:number): Invite[]
    {
        return this.inviterepository.getSenderInvites(sender_id);
    }

    addInvite(reciever_usrname:number, sender_usrname:number)
    {
        return this.inviterepository.addInvite(reciever_usrname, sender_usrname);
    }

    setInviteStatus(sender_id: number, receiver_id: number, status: string) {
        this.inviterepository.updateStatus(sender_id, receiver_id, status);
        this.friendRepo.addFriend(sender_id, receiver_id);
    }
}
