import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "../controllers/User.controller";
import {InviteController} from "../controllers/Invite.controller";
const usercontroller = new UserController();
const invitecontroller = new InviteController();

export default async function userRoutes( fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    return usercontroller.getAllUsers();});

  fastify.get("/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const user_id = Number(id);
    return usercontroller.getUserById(user_id);});

    fastify.get("/add_user", async (request: FastifyRequest, reply: FastifyReply) => {
      const query = request.query as { id?: string; username?: string; level?: string };
    
      const userId = query.id ? Number(query.id) : undefined;
      const username = String(query.username);
      const userLevel = query.level ? Number(query.level) : 1; // default level
    
      return usercontroller.addUser(username); // pass username (required)
    });
    
}

// export async function inviteRoutes( fastify: FastifyInstance, options: FastifyPluginOptions) {
//   fastify.get("/:receiver_id", async (request: FastifyRequest, reply: FastifyReply) => {
//     const { receiver_id } = request.params as { receiver_id: string };

//     // Convert to number
//     const id = Number(receiver_id);
//     return invitecontroller.GetSenderInvites(id);});
// }
