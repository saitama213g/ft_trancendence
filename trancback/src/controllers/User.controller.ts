import { UserService } from "../services/User.service";
import { User } from "../models/User.model";
import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export class UserController {
    private userservice: UserService;
    constructor() {
        this.userservice = new UserService();
    }

    getUserById(id: number) {
        return this.userservice.getUserById(id);
    }

    async deleteUser(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        try {
          const result = await this.userservice.deleteUserById(Number(id));
          return reply.send(result);
        } catch (error) {
          return reply.code(404).send({ error: (error as Error).message });
        }
      }

    getAllUsers() {
        return this.userservice.getAllUsers();
    }
    addUser(username: string) {
        return this.userservice.addUser(username);
    }
    async addNewUser(fastify: FastifyInstance, request:FastifyRequest, response:FastifyReply)
    {
        console.log("Register endpoint hit with body:", request.body);
        const {username, email, password } = request.body as any;
        // TODO: Check your database here
        if (email && password && username) {
            console.log("Attempting to register user:", { email, username });
            try {
                const newUser = await this.userservice.registerUser(email, username, password);
                const token = fastify.jwt.sign({
                    id: newUser.id,
                    username: newUser.username,
                    email : newUser.email
                });
                return response.send({ token });
            } catch (error) {
                console.log("Error during user registration:", error);
                return response.code(400).send({ error: (error as Error).message });
            }
        }
        console.log("Invalid registration attempt:", { email, username });
        return response.code(400).send({ error: 'Invalid credentials' });
    }
}
