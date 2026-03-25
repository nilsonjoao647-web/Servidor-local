import { Router } from "express"
import { PrestacaoServicoController } from "../controllers/prestacao_servico.controller.js"



const PrestacaoServicoRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const prestacaoservico = Router()
prestacaoservico.post(PrestacaoServicoRoute.create, PrestacaoServicoController.createPrestacaoServico)
prestacaoservico.get(PrestacaoServicoRoute.getById, PrestacaoServicoController.getAllPrestacaoServico)
prestacaoservico.get(PrestacaoServicoRoute.getAll, PrestacaoServicoController.getAllPrestacaoServico)
prestacaoservico.put(PrestacaoServicoRoute.update, PrestacaoServicoController.updatePrestacaoServico)
prestacaoservico.delete(PrestacaoServicoRoute.delete, PrestacaoServicoController.deletePrestacaoServico)


export { Router }