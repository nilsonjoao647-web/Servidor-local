import { Router } from "express"
import { OrcamentoController } from "../controllers/orcamento.controller.js"



const OrcamentoRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const orcamento = Router()
orcamento.post(OrcamentoRoute.create, OrcamentoController.createOrcamento)
orcamento.get(OrcamentoRoute.getById, OrcamentoController.getAllOrcamento)
orcamento.get(OrcamentoRoute.getAll, OrcamentoController.getAllOrcamento)
orcamento.put(OrcamentoRoute.update, OrcamentoController.updateOrcamento)
orcamento.delete(OrcamentoRoute.delete, OrcamentoController.deleteOrcamento)


export { Router }