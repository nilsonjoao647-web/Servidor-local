import { Router } from "express"
import { PrestacaoServicoController } from "../controllers/prestacao_servico.controller.js"



const PrestacaoServicoRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    getAllPrestacaoServicoDetalhada: "/get-all-detalhada"
}

const router = Router()
router.post(PrestacaoServicoRoute.create, PrestacaoServicoController.create)
router.get(PrestacaoServicoRoute.getById, PrestacaoServicoController.getAll)
router.get(PrestacaoServicoRoute.getAll, PrestacaoServicoController.get)
router.put(PrestacaoServicoRoute.update, PrestacaoServicoController.update)
router.delete(PrestacaoServicoRoute.delete, PrestacaoServicoController.delete)
router.get(PrestacaoServicoRoute.getAllPrestacaoServicoDetalhada, PrestacaoServicoController.getAllPrestacaoServicoDetalhado)


export { Router }