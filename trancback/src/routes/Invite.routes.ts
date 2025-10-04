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
}
