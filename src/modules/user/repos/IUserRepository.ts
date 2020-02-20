import {User} from '../domain/User';
import {HashedPassword} from '../domain/HashedPassword';

export interface IUserRepository {
  createUser(username: string, hashedPassword: string): Promise<User>
  getUserPasswordWithUsername(username: string): Promise<HashedPassword>
}
