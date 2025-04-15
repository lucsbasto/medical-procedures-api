import { User } from '../user.entity';

export interface UserRepository {
  create(user: User): Promise<User>;
  findByUsername(username: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}
