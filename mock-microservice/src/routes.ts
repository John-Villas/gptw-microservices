import { Router } from "express"
import { UserController } from "./controllers/UserController"
import useAuthenticator from "./hooks/useAuthenticator"

const routes = Router()

routes.post("/user", new UserController().create)
routes.get("/user/:id", useAuthenticator, new UserController().findOneById)
routes.put("/user/:id", useAuthenticator, new UserController().update)
routes.delete("/user/:id", useAuthenticator, new UserController().delete)

export { routes }
