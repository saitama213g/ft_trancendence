import { FriendService } from "../services/Friends.service";

export class FriendController{
    private friendService: FriendService;

    constructor() {
        this.friendService = new FriendService();
    }

    async addFriend(userId: number, friendId: number) {
        return this.friendService.addFriend(userId, friendId);
    }
    async blockFriend(userId: number, friendId: number) {
        return this.friendService.blockFriend(userId, friendId);
    }
    async unblockFriend(userId: number, friendId: number) {
        return this.friendService.unblockFriend(userId, friendId);
    }

    async removeFriend(userId: number, friendId: number) {
        return this.friendService.removeFriend(userId, friendId);
    }

    async getFriends(userId: number) {
        return this.friendService.getFriends(userId);
    }
}
