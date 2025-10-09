import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UserController } from "../controllers/User.controller";

const usercont = new UserController();

export default async function userRoutes( fastify: FastifyInstance, options: FastifyPluginOptions)
{
  fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    return usercont.addNewUser(fastify, request, reply);
  });

  fastify.get("/whoami", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'JWT is working!', user: request.user };
  });
}
