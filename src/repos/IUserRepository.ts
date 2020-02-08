import { User } from "../domain/User";

export interface IUserRepository {
  createUser(user: User): Promise<User>
  getAllUsers(): Promise<Array<User>>
}