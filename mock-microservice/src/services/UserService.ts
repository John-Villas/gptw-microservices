import { PrismaClient } from "@prisma/client"

interface UserRequest {
  id?: string
  firstname?: string
  lastname?: string
  email?: string
  hash?: string
}

const prisma = new PrismaClient()

export class UserService {
  async create({
    id,
    firstname,
    lastname,
    email,
    hash,
  }: UserRequest): Promise<any | Error> {
    if (await prisma.user.findUnique({ where: { email: email } })) {
      return new Error("This email address has already been registered")
    }

    const user = await prisma.user.create({
      data: {
        id: id,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hash,
      },
    })
    return user
  }

  async findOneById({ id }: UserRequest): Promise<any | Error> {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return new Error("User not found")
    }

    return user
  }

  async update({
    id,
    firstname,
    lastname,
    email,
    hash,
  }: UserRequest): Promise<any | Error> {
    if (!(await prisma.user.findUnique({ where: { id: id } }))) {
      return new Error("Invalid User")
    }

    const user = await prisma.user.update({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hash,
      },
      where: {
        id: id,
      },
    })
    return user
  }

  async delete({ id }: UserRequest): Promise<any | Error> {
    if (!(await prisma.user.findUnique({ where: { id: id } }))) {
      return new Error("Invalid User")
    }

    await prisma.user.delete({
      where: { id },
    })

    return {
      message: "User deleted",
    }
  }
}
