import { User } from "../domain/User";

export interface IUserRepository {
  getAllUsers(): Promise<Array<User>>
}