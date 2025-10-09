import { FriendController } from "../controllers/Friend.controller";
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";

const friendcontroller = new FriendController();

export default async function friendRoutes( fastify: FastifyInstance, options: FastifyPluginOptions)
{
  fastify.get("/", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
      // Assert that request.user has an id property
      const user_id = Number((request.user as { id: string | number }).id);
      // Validate the user_id
      if (!user_id || isNaN(user_id) || user_id <= 0) {
        return reply.status(400).send({ message: "Invalid or missing User ID" });
      }
      return friendcontroller.getFriends(user_id);
    }
  );

  fastify.post("/delete", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
      return friendcontroller.removeFriend(request, reply);
    }
  );
  
  fastify.post("/block", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
      return friendcontroller.blockFriend(request, reply);
    }
  );
  
  fastify.post("/unblock", { preHandler: [fastify.authenticate] },async (request: FastifyRequest, reply: FastifyReply) => {
      return friendcontroller.unblockFriend(request, reply);
    }
  );
}
