import { Request, Response } from "express"
import { v4 as uuid } from "uuid"
import bcrypt from "bcryptjs"
import { UserService } from "../services/UserService"

export class UserController {
  async create(req: Request, res: Response) {
    const { firstname, lastname, email, password } = req.body
    if (!firstname || !lastname || !email || !password) {
      return res
        .status(400)
        .json(
          "The First Name, Last Name, Email and Password info are required."
        )
    }

    const id = uuid()
    const hash = bcrypt.hashSync(password, 8)

    const result = await new UserService().create({
      id,
      firstname,
      lastname,
      email,
      hash,
    })

    if (result instanceof Error) {
      return res.status(409).json(result.message)
    }

    delete result.password

    return res.json(result)
  }

  async findOneById(req: Request, res: Response) {
    const id = req.params.id as string

    const result = await new UserService().findOneById({
      id,
    })

    if (result instanceof Error) {
      return res.status(409).json(result.message)
    }

    delete result.password

    return res.json(result)
  }

  async update(req: Request, res: Response) {
    const { firstname, lastname, email, password } = req.body
    if (!firstname || !lastname || !email || !password) {
      return res
        .status(400)
        .json(
          "The First Name, Last Name, Email and Password info are required."
        )
    }

    const id = req.params.id as string
    const hash = bcrypt.hashSync(password, 8)

    const result = await new UserService().update({
      id,
      firstname,
      lastname,
      email,
      hash,
    })

    if (result instanceof Error) {
      return res.status(409).json(result.message)
    }

    delete result.password

    return res.json(result)
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id as string

    const result = await new UserService().delete({
      id,
    })

    if (result instanceof Error) {
      return res.status(409).json(result.message)
    }

    return res.status(204).json()
  }
}
