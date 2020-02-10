import { User } from "../domain/User";

export interface IUserRepository {
  createUser(username: string, password: string): Promise<any>
  getUserWithUsername(username: string): Promise<User>
  getAllUsers(): Promise<Array<User>>
}
