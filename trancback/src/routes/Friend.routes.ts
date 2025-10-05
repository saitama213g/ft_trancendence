import { FriendController } from "../controllers/Friend.controller";
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";

const friendcontroller = new FriendController();

export default async function friendRoutes( fastify: FastifyInstance, options: FastifyPluginOptions)
{
  fastify.post("/", async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as { user_id?: unknown }; // optional and unknown for safety
    const user_id = Number(body?.user_id);
    
    // Check if user_id was provided and is a number
    if (body?.user_id === undefined || isNaN(user_id)) {
      return reply.status(400).send({ message: "User ID is required and must be a number" });
    }
  
    // Validate range
    if (!Number.isInteger(user_id) || user_id <= 0) {
      return reply.status(400).send({ message: "Invalid User ID" });
    }
  
    return friendcontroller.getFriends(user_id);
  });
  fastify.post("/delete", async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as { user_id?: unknown; friend_id?: unknown }; // optional and unknown for safety
    const user_id = Number(body?.user_id);
    const friend_id = Number(body?.friend_id);
  
    // Check if both IDs were provided and are numbers
    if (body?.user_id === undefined || isNaN(user_id) || body?.friend_id === undefined || isNaN(friend_id)) {
      return reply.status(400).send({ message: "Both User ID and Friend ID are required and must be numbers" });
    }
  
    // Validate range
    if (!Number.isInteger(user_id) || user_id <= 0 || !Number.isInteger(friend_id) || friend_id <= 0) {
      return reply.status(400).send({ message: "Invalid User ID or Friend ID" });
    }
  
    return friendcontroller.removeFriend(user_id, friend_id);
  });
  fastify.post("/block", async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as { user_id?: unknown; friend_id?: unknown }; // optional and unknown for safety
    const user_id = Number(body?.user_id);
    const friend_id = Number(body?.friend_id);
  
    // Check if both IDs were provided and are numbers
    if (body?.user_id === undefined || isNaN(user_id) || body?.friend_id === undefined || isNaN(friend_id)) {
      return reply.status(400).send({ message: "Both User ID and Friend ID are required and must be numbers" });
    }
  
    // Validate range
    if (!Number.isInteger(user_id) || user_id <= 0 || !Number.isInteger(friend_id) || friend_id <= 0) {
      return reply.status(400).send({ message: "Invalid User ID or Friend ID" });
    }
  
    return friendcontroller.blockFriend(user_id, friend_id);
  });
  fastify.post("/unblock", async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as { user_id?: unknown; friend_id?: unknown }; // optional and unknown for safety
    const user_id = Number(body?.user_id);
    const friend_id = Number(body?.friend_id);
  
    // Check if both IDs were provided and are numbers
    if (body?.user_id === undefined || isNaN(user_id) || body?.friend_id === undefined || isNaN(friend_id)) {
      return reply.status(400).send({ message: "Both User ID and Friend ID are required and must be numbers" });
    }
  
    // Validate range
    if (!Number.isInteger(user_id) || user_id <= 0 || !Number.isInteger(friend_id) || friend_id <= 0) {
      return reply.status(400).send({ message: "Invalid User ID or Friend ID" });
    }
  
    return friendcontroller.unblockFriend(user_id, friend_id);
  });
}
