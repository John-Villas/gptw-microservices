import { Router } from "express"
import { AuthController } from "./controllers/AuthController"

const routes = Router()

routes.post("/auth", new AuthController().authenticate)
routes.get("/auth/validate", new AuthController().validate)

export { routes }
