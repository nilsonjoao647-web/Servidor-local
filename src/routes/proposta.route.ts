import { Router } from "express"
import { PropostaController } from "../controllers/proposta.controller.js"
import AuthMiddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"




const PropostaRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const router = Router()

router.post(PropostaRoute.create, authorize([Role.ADMIN]), PropostaController.create)

router.use(AuthMiddleware)

router.get(PropostaRoute.getAll, authorize([Role.ADMIN]), PropostaController.get)
router.get(PropostaRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PropostaController.getAll)
router.put(PropostaRoute.update, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PropostaController.update)
router.delete(PropostaRoute.delete, authorize([Role.ADMIN]), PropostaController.delete)


export { Router }