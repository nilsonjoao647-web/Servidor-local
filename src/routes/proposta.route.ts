import { Router } from "express"
import { PropostaController } from "../controllers/proposta.controller.js"




const PropostaRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const router = Router()
router.post(PropostaRoute.create, PropostaController.create)
router.get(PropostaRoute.getById, PropostaController.getAll)
router.get(PropostaRoute.getAll, PropostaController.get)
router.put(PropostaRoute.update, PropostaController.update)
router.delete(PropostaRoute.delete, PropostaController.delete)


export { Router }