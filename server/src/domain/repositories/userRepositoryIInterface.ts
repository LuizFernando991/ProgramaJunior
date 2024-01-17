import { UserM } from '../model/user'
export interface UserRepository {
  getUserByEmail(email: string): Promise<UserM>
  insert(user: {
    name: string
    password: string
    email: string
  }): Promise<UserM>
}
