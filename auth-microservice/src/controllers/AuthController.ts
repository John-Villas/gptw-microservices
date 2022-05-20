import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { AuthService } from "../services/AuthService"

interface TokenPayload {
  id: string
  iat: number
  exp: number
}

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json("Please Provide an email address and a password")
    }

    const result = await new AuthService().authenticate({
      email,
      hash: password,
    })

    if (result instanceof Error) {
      return res.status(401).json(result.message)
    }

    const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })

    delete result.password

    return res.json({ result, token })
  }

  async validate(req: Request, res: Response) {
    const { authorization } = req.headers

    try {
      if (!authorization) {
        throw new Error()
      }
      const token = authorization.replace("Bearer", "").trim()
      jwt.verify(token, process.env.JWT_SECRET) as TokenPayload

      return res.status(204).json()
    } catch (error) {
      return res.status(401).json("Unauthorized")
    }
  }
}
