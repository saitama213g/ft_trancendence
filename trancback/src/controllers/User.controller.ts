import { UserService } from "../services/User.service";
import { FastifyRequest, FastifyReply, FastifyInstance  } from "fastify";
export class UserController {
    private userservice: UserService;
    constructor() {
        this.userservice = new UserService();
    }
    getUserById(id: number) {
        return this.userservice.getUserById(id);
    }
    getAllUsers() {
        return this.userservice.getAllUsers();
    }

    getAllUsersExceptCurrent(request: FastifyRequest) {
        const user = request.user as { id: number };
        return this.userservice.getAllUsersExcept(user.id);
    }
    addUser(username: string) {
        return this.userservice.addUser(username);
    }
    async createUserLogin(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
        const { email, password, username } = request.body as any;

        if (!email || !password || !username) {
            return reply.code(400).send({ error: 'Missing required fields' });
        }

        const validation = await this.userservice.validateNewUser(email, username);
        if (!validation.isValid) {
            return reply.code(400).send({ error: validation.error });
        }

        const user = this.userservice.addUser(username);
        const token = fastify.jwt.sign({ id: user.id, email });
        
        return { token };
    }

    async searchUsers(request: FastifyRequest, reply: FastifyReply) {
        const { search } = request.query as { search?: string };
        
        if (!search) {
            return reply.code(400).send({ error: 'Search query is required' });
        }

        const user = request.user as { id: number };
        const users = this.userservice.searchUsersExcept(search, user.id);
        return reply.send(users);
    }

    // Added to match route in User.route.ts
    async addNewUser(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
        const { email, password, username } = request.body as any;

        if (!email || !password || !username) {
            return reply.code(400).send({ error: 'Missing required fields' });
        }

        try {
            const newUser = await this.userservice.registerUser(email, username, password);
            const token = fastify.jwt.sign({
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            });
            return reply.send({ token });
        } catch (error) {
            return reply.code(400).send({ error: (error as Error).message });
        }
    }

    // Added to match route in User.route.ts
    async deleteUser(fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        try {
            await this.userservice.deleteUserById(Number(id));
            return reply.send({ message: 'User deleted successfully' });
        } catch (error) {
            return reply.code(404).send({ error: (error as Error).message });
        }
    }
}
