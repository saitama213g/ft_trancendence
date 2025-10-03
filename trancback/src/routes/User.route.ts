import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "../controllers/User.controller";

const usercontroller = new UserController();

export default async function userRoutes( fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    return usercontroller.getAllUsers();});
}
