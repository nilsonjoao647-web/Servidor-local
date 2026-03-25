import { Router } from "express"
import { UserController } from "../controllers/user.controller.js"

const UserRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const user = Router()

user.post(UserRoute.create, UserController.createUser)
user.get(UserRoute.getById, UserController.allUsers)
user.get(UserRoute.getAll, UserController.allUsers)
user.put(UserRoute.update, UserController.allUsers)
user.delete(UserRoute.delete, UserController.delete)


export { Router }