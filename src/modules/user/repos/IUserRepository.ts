import {User} from '../domain/User';
import {HashedPassword} from '../domain/HashedPassword';
import { Username } from '../domain/Username';

export interface IUserRepository {
  // createUser(username: string, hashedPassword: string): Promise<User>
  createUser(user: User): Promise<User>
  getUserPasswordWithUsername(username: Username): Promise<User>
}
