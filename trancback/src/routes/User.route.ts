import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "../controllers/User.controller";
import {InviteController} from "../controllers/Invite.controller";
const usercontroller = new UserController();
// const invitecontroller = new InviteController();

export default async function userRoutes( fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return usercontroller.getAllUsersExceptCurrent(request);
  });

  fastify.post("/register", async (request: FastifyRequest, reply: FastifyReply) => {
    return usercontroller.addNewUser(fastify, request, reply);
  });

  fastify.delete("/:id", async (request, reply) => {
    return usercontroller.deleteUser(fastify, request, reply);
  });

  fastify.get("/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const user_id = Number(id);
    return usercontroller.getUserById(user_id);
  });

  fastify.get("/add_user", async (request: FastifyRequest, reply: FastifyReply) => {
    const query = request.query as { id?: string; username?: string; level?: string };
    // const userId = query.id ? Number(query.id) : undefined;
    const username = String(query.username);
    // const userLevel = query.level ? Number(query.level) : 1; // default level
    return usercontroller.addUser(username); // pass username (required)
  });

  // New search route
  fastify.get("/search", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return usercontroller.searchUsers(request, reply);
  });
}
