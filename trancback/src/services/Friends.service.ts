import { FriendRepository} from "../repositories/Friend.repository";

export class FriendService {
  private friendRepository: FriendRepository;

  constructor() {
    this.friendRepository = new FriendRepository();
  }

  async addFriend(userId: number, friendId: number) {
    return this.friendRepository.addFriend(userId, friendId);
  }
  async blockFriend(userId: number, friendId: number) {
    return this.friendRepository.updateFriendStatus(userId, friendId, "blocked");
  }
  async unblockFriend(userId: number, friendId: number) {
    return this.friendRepository.updateFriendStatus(userId, friendId, "friends");
  }

  async removeFriend(userId: number, friendId: number) {
    return this.friendRepository.removeFriend(userId, friendId);
  }

  async getFriends(userId: number) {
    return this.friendRepository.getFriends(userId);
  }
}