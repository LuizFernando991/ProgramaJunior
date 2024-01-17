import { Injectable } from '@nestjs/common'
import { PrismaService } from '../db/prisma.service'
import { UserRepository } from 'src/domain/repositories/userRepositoryIInterface'
import { UserM } from 'src/domain/model/user'

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getUserByEmail(email: string): Promise<UserM> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) {
      return null
    }
    return user
  }

  async insert(userData: {
    email: string
    name: string
    password: string
  }): Promise<UserM> {
    const newUser = await this.prisma.user.create({
      data: userData
    })

    return newUser
  }
}
