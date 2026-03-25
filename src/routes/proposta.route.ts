import { Router } from "express"
import { PropostaController } from "../controllers/proposta.controller.js"




const PropostaRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const proposta = Router()
proposta.post(PropostaRoute.create, PropostaController.createpropostas)
proposta.get(PropostaRoute.getById, PropostaController.getpropostas)
proposta.get(PropostaRoute.getAll, PropostaController.allUproposta)
proposta.put(PropostaRoute.update, PropostaController.updatepropostas)
proposta.delete(PropostaRoute.delete, PropostaController.deletepropostas)


export { Router }