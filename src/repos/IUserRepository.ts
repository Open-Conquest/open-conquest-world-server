import { User } from "../domain/User";

export interface IUserRepository {
  createUser(username: string, password: string): Promise<User>
  getUserWithUsername(username: string): Promise<User>
  getUserPasswordWithUsername(username: string): Promise<User>
}
