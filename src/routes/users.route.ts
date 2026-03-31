import { Router } from "express"
import { UserController } from "../controllers/user.controller.js"
import AuthMiddleware from "../security/auth.middleware.js"

const UserRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    login:"/login"
}

const user = Router()

user.post(UserRoute.create, UserController.createUser)
user.get(UserRoute.getById, UserController.allUsers)
user.get(UserRoute.getAll, AuthMiddleware, UserController.allUsers)
user.put(UserRoute.update, UserController.allUsers)
user.delete(UserRoute.delete, UserController.delete)
user.post(UserRoute.login, UserController.login)



export { Router }