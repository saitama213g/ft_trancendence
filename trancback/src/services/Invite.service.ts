import {InviteRepository} from "../repositories/Invite.repository"
import {Invite} from "../models/Invite.model"
import {SentInvite} from "../models/Invite.model"
import {ReceivedInvite} from "../models/Invite.model"
import {FriendRepository} from "../repositories/Friend.repository"

export class InviteService{
    private inviterepository = new InviteRepository();
    private friendRepo = new FriendRepository();

    getAllInvites(): Invite[]
    {
        return this.inviterepository.getAllInvites();
    }

    GetRecieverInvites(reciever_id:number): ReceivedInvite[]
    {
        return this.inviterepository.getRecieverInvites(reciever_id);
    }

    GetSenderInvites(sender_id:number): SentInvite[]
    {
        return this.inviterepository.getSenderInvites(sender_id);
    }

    addInvite(reciever_usrname:number, sender_usrname:number)
    {
        return this.inviterepository.addInvite(reciever_usrname, sender_usrname);
    }

    setInviteStatus(sender_id: number, receiver_id: number, status: "accepted" | "rejected") {
        // Check valid status
        if (!["accepted", "rejected"].includes(status)) {
            return { success: false, message: "Invalid status" };
        }
    
        // Update status and add friend atomically
        const updated = this.inviterepository.updateStatus(sender_id, receiver_id, status);
        if (!updated) {
            return { success: false, message: "Failed to update invite" };
        }
    
        if (status === "accepted") {
            this.friendRepo.addFriend(sender_id, receiver_id);
        }
    
        return { success: true, message: "Invite processed successfully" };
    }

    // Helper to check if invite exists
    inviteExists(sender_id: number, receiver_id: number): boolean {
        return this.inviterepository.inviteExists(sender_id, receiver_id);
    }

    // Helper to check if users are already friends
    areFriends(user_id: number, friend_id: number): boolean {
        return this.friendRepo.areFriends(user_id, friend_id);
    }
}
