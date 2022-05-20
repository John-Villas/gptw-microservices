import { NextFunction, Request, Response } from "express"
import fetch from "node-fetch"

export default async function useAuthenticator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = await fetch(`${process.env.AUTH_SERVICE_URL}/auth/validate`, {
    method: "get",
    headers: req.headers,
  }).then((res) => {
    return res
  })

  if (result.status === 401) {
    return res.status(401).json(result.statusText)
  }

  next()
}
