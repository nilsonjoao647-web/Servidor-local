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

const router = Router()

router.post(UserRoute.create, UserController.createUser)
router.get(UserRoute.getById, UserController.allUsers)
router.get(UserRoute.getAll, AuthMiddleware, UserController.allUsers)
router.put(UserRoute.update, UserController.allUsers)
router.delete(UserRoute.delete, UserController.delete)
router.post(UserRoute.login, UserController.login)



export { Router }