import { UserService } from "../services/User.service";

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
    addUser(username: string) {
        return this.userservice.addUser(username);
    }
}
