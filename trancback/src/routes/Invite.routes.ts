import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { InviteController } from "../controllers/Invite.controller";

const invitecontroller = new InviteController();

export default async function inviteRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // ✅ Get all invites (for authenticated user)
  // fastify.get("/", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
  //   const { id } = request.user as { id: number | string };
  //   const user_id = Number(id);

  //   if (!user_id || isNaN(user_id) || user_id <= 0) {
  //     return reply.status(400).send({ message: "Invalid user ID" });
  //   }

  //   return invitecontroller.GetRecieverInvites(user_id);
  // });

  // ✅ Send an invite
  fastify.post("/invite", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.user as { id: number | string };
    const sender_id = Number(id);
    const body = request.body as { receiver_id: number };

    if (!body.receiver_id || isNaN(body.receiver_id)) {
      return reply.status(400).send({ message: "Receiver ID is required and must be a valid number" });
    }

    if (!sender_id || sender_id <= 0) {
      return reply.status(400).send({ message: "Invalid sender ID" });
    }

    return invitecontroller.addInvite(sender_id, body.receiver_id);
  });

  // ✅ Accept invite
  fastify.post("/accept", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.user as { id: number | string };
    const receiver_id = Number(id);
    const body = request.body as { sender_id: number };

    if (!body.sender_id || isNaN(body.sender_id)) {
      return reply.status(400).send({ message: "Sender ID is required and must be a valid number" });
    }

    return invitecontroller.acceptInvite(body.sender_id, receiver_id);
  });

  // ✅ Decline invite
  fastify.post("/decline", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.user as { id: number | string };
    const receiver_id = Number(id);
    const body = request.body as { sender_id: number };

    if (!body.sender_id || isNaN(body.sender_id)) {
      return reply.status(400).send({ message: "Sender ID is required and must be a valid number" });
    }

    return invitecontroller.declineInvite(body.sender_id, receiver_id);
  });

  // ✅ Get invites sent by authenticated user
  fastify.get("/sent", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.user as { id: number | string };
    const sender_id = Number(id);

    if (!sender_id || isNaN(sender_id) || sender_id <= 0) {
      return reply.status(400).send({ message: "Invalid sender ID" });
    }

    return invitecontroller.GetSenderInvites(sender_id);
  });

  // ✅ Get invites received by authenticated user
  fastify.get("/received", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.user as { id: number | string };
    const receiver_id = Number(id);

    if (!receiver_id || isNaN(receiver_id) || receiver_id <= 0) {
      return reply.status(400).send({ message: "Invalid receiver ID" });
    }

    return invitecontroller.GetRecieverInvites(receiver_id);
  });
}
