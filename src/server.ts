import Fastify from "fastify";

const fastify = Fastify({ logger: true });

// Example route
fastify.get("/", async () => {
  return { hello: "worldddd" };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("✅ Server running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
