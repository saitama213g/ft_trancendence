export default async function authenticate (request: any, reply: any)  {
  try {
    // Verify JWT from Authorization header or cookie
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ error: "Unauthorized" });
  }
}