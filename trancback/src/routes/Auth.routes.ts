import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";

export default async function userRoutes( fastify: FastifyInstance, options: FastifyPluginOptions)
{
  fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as any;

    // TODO: Check your database here
    if (email && password) {
      const token = fastify.jwt.sign({ 
        id: 1, 
        email 
      });
      return { token };
    }

    return reply.code(401).send({ error: 'Invalid credentials' });
  });

  fastify.get("/test-jwt", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'JWT is working!', user: request.user };
  });
}