import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

interface UserRequest {
  id?: string
  email?: string
  hash?: string
}

const prisma = new PrismaClient()

export class AuthService {
  async authenticate({ email, hash }: UserRequest): Promise<any | Error> {
    if (!(await prisma.user.findUnique({ where: { email: email } }))) {
      return new Error("You have entered an incorrect email or password")
    }

    const user = await prisma.user.findUnique({ where: { email: email } })

    const isValidPassword = await bcrypt.compare(hash, user.password)

    if (!isValidPassword) {
      return new Error("You have entered an incorrect email or password")
    }

    return user
  }

  async verify({ id }: UserRequest): Promise<any | Error> {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return new Error("User not found")
    }

    return user
  }
}
