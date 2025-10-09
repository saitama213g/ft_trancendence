import {User} from "../models/User.model";
import {UserRepository} from "../repositories/User.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getUserById(id: number): User {
    const user = this.userRepository.getUserById(id);
    console.log("Retrieved user:");
    if (!user) throw new Error("User not found");
    return user;
  }

  getAllUsers(): User[] {
    return this.userRepository.getAll();
  }

  addUser(username: string): User {
    return this.userRepository.addUser(username);
  }

  

  async deleteUserById(id: number) {
    const result = this.userRepository.deleteUserById(id);
    if (result.changes === 0) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  }
  async registerUser(email: string, username: string, password: string) {
    // console.log("Registering user with email:", email);
    // Check if email already exists
    const existingEmail = await this.userRepository.findByEmail(email);
    if (existingEmail) {
      throw new Error("Email is already taken");
    }

    // Check if username already exists
    const existingUsername = await this.userRepository.findByUsername(username);
    if (existingUsername) {
      throw new Error("Username is already taken");
    }
    console.log("Registering user:", { email, username });

    // If both checks pass, create the user
    const newUser = this.userRepository.createUser(email, username, password);
    return newUser;
  }
}
