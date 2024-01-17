export class UserWithoutPassword {
  id: number
  email: string
  createdAt: Date
  updatedAt: Date
}

export class UserM extends UserWithoutPassword {
  password: string
}
