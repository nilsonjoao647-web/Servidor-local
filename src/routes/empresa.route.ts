import { Router } from "express"
import { EmpresaController } from "../controllers/empresa.controller.js"
import AuthMiddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"

const EmpresaRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    resetPassword: "/reset-password/:id",
    login:"/login"
}

const router = Router()

router.post(EmpresaRoute.login, EmpresaController.login)
router.post(EmpresaRoute.create, EmpresaController.create)

router.use(AuthMiddleware)

router.get(EmpresaRoute.getAll, authorize([Role.ADMIN]), EmpresaController.getAll)
router.get(EmpresaRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), EmpresaController.getById)
router.put(EmpresaRoute.update,  authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), EmpresaController.update)
router.delete(EmpresaRoute.delete,  authorize([Role.ADMIN]), EmpresaController.delete)
// router.put(EmpresaRoute.resetPassword,  authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), EmpresaController.resetPassword)

export { Router }