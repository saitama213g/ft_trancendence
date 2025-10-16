import {User} from "../models/User.model";
import {UserRepository} from "../repositories/User.repository";
import bcrypt from "bcrypt";

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

  getAllUsersExcept(excludeUserId: number): User[] {
    return this.userRepository.getAllExcept(excludeUserId);
  }

  addUser(username: string): User {
    return this.userRepository.addUser(username);
  }

  async validateNewUser(email: string, username: string): Promise<{ isValid: boolean; error?: string }> {
    if (this.userRepository.isEmailTaken(email)) {
      return { isValid: false, error: 'Email already registered' };
    }
    
    if (this.userRepository.isUsernameTaken(username)) {
      return { isValid: false, error: 'Username already taken' };
    }
    
    return { isValid: true };
  }
  searchUsers(query: string): User[] {
    if (!query) {
      return [];
    }
    return this.userRepository.searchUsers(query);
  }

  searchUsersExcept(query: string, excludeUserId: number): User[] {
    if (!query) {
      return [];
    }
    return this.userRepository.searchUsersExcept(query, excludeUserId);
  }

  async registerUser(email: string, username: string, password: string) {
    // Check if email or username already exists
    const validation = await this.validateNewUser(email, username);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Pass hashed password to the repository
    return this.userRepository.createUser(email, username, hashedPassword);
  }

  async deleteUserById(id: number) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.deleteUserById(id);
    return true;
  }
}
