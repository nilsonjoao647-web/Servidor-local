import { Router } from "express"
import AuthMiddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"
import { CategoriaController } from "../controllers/categoria.controller.js"



const CategoriaRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    getAllCategoriaDetalhada: "/get-all-detalhada"
}

const router = Router()

router.post(CategoriaRoute.create, authorize([Role.ADMIN]), CategoriaController.create)

router.use(AuthMiddleware)

router.get(CategoriaRoute.getAll, authorize([Role.ADMIN]), CategoriaController.getAll)
router.get(CategoriaRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), CategoriaController.getAll)
router.put(CategoriaRoute.update, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), CategoriaController.update)
router.delete(CategoriaRoute.delete, authorize([Role.ADMIN]), CategoriaController.delete)
router.get(CategoriaRoute.getAll, authorize([Role.ADMIN]), CategoriaController.getAll)


export { Router }