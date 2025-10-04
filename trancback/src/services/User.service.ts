import {User} from "../models/User.model";
import {UserRepository} from "../repositories/User.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getUserById(id: number): User {
    const user = this.userRepository.getUserById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  getAllUsers(): User[] {
    return this.userRepository.getAll();
  }

  addUser(username: string): User {
    return this.userRepository.addUser(username);
  }
}
