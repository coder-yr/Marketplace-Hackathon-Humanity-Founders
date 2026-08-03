import { User, IUser } from '../models/user.model'

export class UserRepository {
  async findByEmail(email: string, includePassword = false): Promise<IUser | null> {
    const query = User.findOne({ email })
    if (includePassword) {
      query.select('+password')
    }
    return query.exec()
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id).exec()
  }

  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData)
    return user.save()
  }
}

export const userRepository = new UserRepository()
