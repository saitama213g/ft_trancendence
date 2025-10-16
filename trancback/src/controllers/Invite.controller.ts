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
        if (!reciever_id || !sender_id) {
            throw new Error("Both reciever_id and sender_id are required");
        }

        // Check if users are already friends
        const alreadyFriends = this.inviteservice.areFriends(sender_id, reciever_id);
        if (alreadyFriends) {
            return { success: false, message: "You are already friends with this user" };
        }

        // Check if invite already exists
        const inviteExists = this.inviteservice.inviteExists(sender_id, reciever_id);
        if (inviteExists) {
            return { success: false, message: "Invite already exists" };
        }

        return this.inviteservice.addInvite(reciever_id, sender_id);
    }
    acceptInvite(sender_id: number, receiver_id: number) {
        // Check if invite exists
        const inviteExists = this.inviteservice.inviteExists(sender_id, receiver_id);
        if (!inviteExists) {
            return { success: false, message: "Invite does not exist"};
        }
    
        // Update invite status
        return this.inviteservice.setInviteStatus(sender_id, receiver_id, "accepted");
    }
    declineInvite(sender_id: number, receiver_id: number) {
        return this.inviteservice.setInviteStatus(sender_id, receiver_id, "rejected");
    }
    getAllInvites() {
        return this.inviteservice.getAllInvites();
    }
}
