import { Router } from "express"
import { OrcamentoController } from "../controllers/orcamento.controller.js"
import AuthMiddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"



const OrcamentoRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    calcular:"/calcular/:id"
}

const router = Router()

router.post(OrcamentoRoute.create, authorize([Role.ADMIN]), OrcamentoController.create)
router.put(OrcamentoRoute.calcular, authorize([Role.ADMIN]), OrcamentoController.calcularBudget)

router.use(AuthMiddleware)

router.get(OrcamentoRoute.getAll, authorize([Role.ADMIN]), OrcamentoController.get)
router.get(OrcamentoRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), OrcamentoController.getAll)
router.put(OrcamentoRoute.update, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), OrcamentoController.update)
router.delete(OrcamentoRoute.delete, authorize([Role.ADMIN]), OrcamentoController.delete)


export { Router }