import { FriendService } from "../services/Friends.service";
import fastify, { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
export class FriendController{
    private friendService: FriendService;

    constructor() {
        this.friendService = new FriendService();
    }

    async addFriend(userId: number, friendId: number) {
        return this.friendService.addFriend(userId, friendId);
    }
    async removeFriend( request: FastifyRequest, reply: FastifyReply) {
        const user_id = Number((request.user as { id: string | number }).id);
        const body = request.body as { friend_id?: string | number };
        const friend_id = Number(body?.friend_id);

        if (!user_id || isNaN(user_id) || user_id <= 0) {
          return reply.status(400).send({ message: "Invalid or missing User ID" });
        }

        if (!friend_id || isNaN(friend_id) || friend_id <= 0) {
          return reply.status(400).send({ message: "Invalid or missing Friend ID" });
        }

        const result = await this.friendService.removeFriend(user_id, friend_id);
        return reply.send(result);
    }

    async blockFriend(request: FastifyRequest, reply: FastifyReply) {
        const user_id = Number((request.user as { id: string | number }).id);
        const body = request.body as { friend_id?: string | number };
        const friend_id = Number(body?.friend_id);

        if (!user_id || isNaN(user_id) || user_id <= 0) {
            return reply.status(400).send({ message: "Invalid or missing User ID" });
        }

        if (!friend_id || isNaN(friend_id) || friend_id <= 0) {
            return reply.status(400).send({ message: "Invalid or missing Friend ID" });
        }

        const result = await this.friendService.blockFriend(user_id, friend_id);
        return reply.send(result);
    }

    async unblockFriend( request: FastifyRequest, reply: FastifyReply) {
        const user_id = Number((request.user as { id: string | number }).id);
        const body = request.body as { friend_id?: string | number };
        const friend_id = Number(body?.friend_id);

        if (!user_id || isNaN(user_id) || user_id <= 0) {
            return reply.status(400).send({ message: "Invalid or missing User ID" });
        }

        if (!friend_id || isNaN(friend_id) || friend_id <= 0) {
            return reply.status(400).send({ message: "Invalid or missing Friend ID" });
        }

        const result = await this.friendService.unblockFriend(user_id, friend_id);
        return reply.send(result);
    }
        
    async getFriends(userId: number) {
            return this.friendService.getFriends(userId);
    }
}
