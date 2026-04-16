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


router.use(AuthMiddleware)

router.post(PropostaRoute.create,  PropostaController.create)
router.get(PropostaRoute.getAll, PropostaController.get)
router.get(PropostaRoute.getById, PropostaController.getAll)
router.put(PropostaRoute.update, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA, "owner"]), PropostaController.update)
router.delete(PropostaRoute.delete, authorize([Role.ADMIN, Role.PRESTADOR, Role.EMPRESA, "owner" ]), PropostaController.delete)


export { Router }