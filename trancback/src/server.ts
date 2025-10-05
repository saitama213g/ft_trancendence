import Fastify from "fastify";
import userRoutes from "./routes/User.route";
import inviteRoutes from "./routes/Invite.routes";
import friendRoutes from "./routes/Friend.routes";
import gameRoutes from "./routes/Game.routes";
import fjwt from '@fastify/jwt';
declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any;
  }
}

const fastify = Fastify({ logger: true });
fastify.register(fjwt, {
  secret: 'your-secret-key'
});

fastify.decorate("authenticate", async (request: any, reply: any) => {
  try {
    // Verify JWT from Authorization header or cookie
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ error: "Unauthorized" });
  }
});

fastify.post('/login', async (request, reply) => {
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
// fastify.get('/protected', { preValidation: [fastify.authenticate] }, async (request, reply) => {
//   // Access user information from the token via request.user
//   return { message: `Welcome, ${request.user.user}! You accessed a protected route.` };
// });
fastify.get('/test-jwt', { preHandler: [fastify.authenticate] }, async (request: any, reply) => 
{
  return { message: 'JWT is working!', user: request.user };
});



fastify.register(userRoutes, { prefix: "/users" });
fastify.register(inviteRoutes, { prefix: "/invites" });
fastify.register(friendRoutes, { prefix: "/friends" });
fastify.register(gameRoutes, { prefix: "/games" });

fastify.setErrorHandler((error, request, reply) => {
  // Log the full error (stack trace) to the console or logger
  request.log.error(error);

  // Detect 404s or custom errors
  if (error.statusCode === 404) {
    reply.status(404).send({ message: 'Resource not found' });
  } else {
    // Show detailed message only in dev mode
    const isDev = process.env.NODE_ENV !== 'production';
    reply.status(500).send({
      message: isDev ? error.message : 'Internal Server Error',
      stack: isDev ? error.stack : undefined,
    });
  }
});


// start server
const start = async () => {
  try {
    await fastify.listen({ port: 4000 });
    console.log("Server running on http://localhost:4000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
