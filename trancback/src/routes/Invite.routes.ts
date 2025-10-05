import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { InviteController } from "../controllers/Invite.controller";

const invitecontroller = new InviteController();

export default async function inviteRoutes( fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
      return invitecontroller.getAllInvites();
    });
    fastify.post("/invite", async (request: FastifyRequest, reply: FastifyReply) => {
      const body = request.body as {sender_id: number;receiver_id: number;};

      // Validate the required fields
      if (!body.sender_id || !body.receiver_id) {
        return reply.status(400).send({ message: "Both sender and receiver are required" });
      }
  
      // Call controller with body data
      return invitecontroller.addInvite(body.sender_id, body.receiver_id);
    });
    fastify.post("/accept", async (request: FastifyRequest, reply: FastifyReply) => {
      const body = request.body as {sender_id: number;receiver_id: number;};
  
      // Validate the required fields
      if (!body.sender_id || !body.receiver_id) {
        return reply.status(400).send({ message: "Both sender and receiver are required" });
      }
  
      // Call controller with body data
      return invitecontroller.acceptInvite(body.sender_id, body.receiver_id);
    });
    fastify.post("/decline", async (request: FastifyRequest, reply: FastifyReply) => {
      const body = request.body as {sender_id: number;receiver_id: number;};
  
      // Validate the required fields
      if (!body.sender_id || !body.receiver_id) {
        return reply.status(400).send({ message: "Both sender and receiver are required" });
      }
  
      // Call controller with body data
      return invitecontroller.declineInvite(body.sender_id, body.receiver_id);
    });
    fastify.post("/invites/sent/", async (request: FastifyRequest, reply: FastifyReply) => {
      const body = request.body as { sender_id?: unknown }; // optional and unknown for safety
      const sender_id = Number(body?.sender_id);
      
      // Check if sender_id was provided and is a number
      if (body?.sender_id === undefined || isNaN(sender_id)) {
        return reply.status(400).send({ message: "Sender ID is required and must be a number" });
      }
    
      // Validate range
      if (!Number.isInteger(sender_id) || sender_id <= 0) {
        return reply.status(400).send({ message: "Invalid Sender ID" });
      }
    
      return invitecontroller.GetSenderInvites(sender_id);
    });
    fastify.post("/invites/received/", async (request: FastifyRequest, reply: FastifyReply) => {
      const body = request.body as { reciever_id?: unknown }; // optional and unknown for safety
      const reciever_id = Number(body?.reciever_id);
      
      // Check if reciever_id was provided and is a number
      if (body?.reciever_id === undefined || isNaN(reciever_id)) {
        return reply.status(400).send({ message: "Receiver ID is required and must be a number" });
      }
    
      // Validate range
      if (!Number.isInteger(reciever_id) || reciever_id <= 0) {
        return reply.status(400).send({ message: "Invalid Receiver ID" });
      }
    
      return invitecontroller.GetRecieverInvites(reciever_id);
    });
}
