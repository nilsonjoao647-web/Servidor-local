import { Router } from "express"
import { PrestacaoServicoController } from "../controllers/prestacao_servico.controller.js"
import AuthMiddleware, { authorize } from "../security/auth.middleware.js"
import { Role } from "../utils/types.js"



const PrestacaoServicoRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    getAllPrestacaoServicoDetalhada: "/get-all-detalhada"
}

const router = Router()

router.post(PrestacaoServicoRoute.create, authorize([Role.ADMIN]), PrestacaoServicoController.create)

router.use(AuthMiddleware)

router.get(PrestacaoServicoRoute.getAll, authorize([Role.ADMIN]), PrestacaoServicoController.get)
router.get(PrestacaoServicoRoute.getById, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.getAll)
router.put(PrestacaoServicoRoute.update, authorize([Role.ADMIN, Role.CLIENTE, Role.PRESTADOR, Role.EMPRESA]), PrestacaoServicoController.update)
router.delete(PrestacaoServicoRoute.delete, authorize([Role.ADMIN]), PrestacaoServicoController.delete)
router.get(PrestacaoServicoRoute.getAll, authorize([Role.ADMIN]), PrestacaoServicoController.getAll)


export { Router }