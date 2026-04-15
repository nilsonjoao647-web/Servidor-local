import { Router } from "express"
import { ServiceController} from "../controllers/servico.controller.js"
import AuthMiddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"



const ServiceRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    getAllDetailed: "/all-detailed"
}

const router = Router()

router.post(ServiceRoute.create, authorize ([Role.ADMIN]), ServiceController.Create)

router.use(AuthMiddleware)

router.get(ServiceRoute.getAll, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), ServiceController.getAll)
router.get(ServiceRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), ServiceController.get)
router.get(ServiceRoute.getAllDetailed, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), ServiceController.getAllServicoDetalhado)
router.put(ServiceRoute.update, authorize ([Role.ADMIN]), ServiceController.update)
router.delete(ServiceRoute.delete, authorize ([Role.ADMIN]), ServiceController.delete)


export { Router }