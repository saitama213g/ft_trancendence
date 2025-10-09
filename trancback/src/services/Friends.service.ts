import { FriendRepository} from "../repositories/Friend.repository";
import { UserRepository } from "../repositories/User.repository";
export class FriendService {
  private friendRepository: FriendRepository;
  private userRepo: UserRepository;
  constructor() {
    this.friendRepository = new FriendRepository();
    this.userRepo = new UserRepository();
  }

  async addFriend(userId: number, friendId: number) {
    // Check both users exist
    if (!this.userRepo.userExists(userId)) {
      return { success: false, message: "User does not exist" };
    }
    if (!this.userRepo.userExists(friendId)) {
      return { success: false, message: "Friend does not exist" };
    }
  
    // Optional: Check they are not already friends
    if (this.friendRepository.areFriends(userId, friendId)) {
      return { success: false, message: "Users are already friends" };
    }
  
    return this.friendRepository.addFriend(userId, friendId);
  }
  async blockFriend(userId: number, friendId: number) {
    // Check both users exist
    if (!this.userRepo.userExists(userId)) {
      return { success: false, message: "User does not exist" };
    }
    if (!this.userRepo.userExists(friendId)) {
      return { success: false, message: "Friend does not exist" };
    }
  
    // Check if they are friends
    const exists = this.friendRepository.areFriends(userId, friendId);
    if (!exists) {
      return { success: false, message: "Users are not friends" };
    }
  
    // Update status to blocked
    return this.friendRepository.updateFriendStatus(userId, friendId, "blocked");
  }
  
  async unblockFriend(userId: number, friendId: number) {
    // Check both users exist
    if (!this.userRepo.userExists(userId)) {
      return { success: false, message: "User does not exist" };
    }
    if (!this.userRepo.userExists(friendId)) {
      return { success: false, message: "Friend does not exist" };
    }
  
    // Check if they are friends
    const exists = this.friendRepository.areFriends(userId, friendId);
    if (!exists) {
      return { success: false, message: "Users are not friends" };
    }
  
    // Update status to friends
    return this.friendRepository.updateFriendStatus(userId, friendId, "friends");
  }
  
  async removeFriend(userId: number, friendId: number) {
    // Check both users exist
    if (!this.userRepo.userExists(userId)) {
      return { success: false, message: "User does not exist" };
    }
    if (!this.userRepo.userExists(friendId)) {
      return { success: false, message: "Friend does not exist" };
    }
  
    // Check if they are friends
    const exists = this.friendRepository.areFriends(userId, friendId);
    if (!exists) {
      return { success: false, message: "Users are not friends" };
    }
  
    // Remove friendship
    return this.friendRepository.removeFriend(userId, friendId);
  }
  
  async getFriends(userId: number) {
    // Check user exists
    if (!this.userRepo.userExists(userId)) {
      return { success: false, message: "User does not exist" };
    }
  
    return this.friendRepository.getFriends(userId);
  }
}
