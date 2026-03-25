import { Router } from "express"
import { ServiceController} from "../controllers/servico.controller.js"



const ServiceRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const servico = Router()
servico.post(ServiceRoute.create, ServiceController.CreateServico)
servico.get(ServiceRoute.getById, ServiceController.getAll)
servico.get(ServiceRoute.getAll, ServiceController.getAll)
servico.put(ServiceRoute.update, ServiceController.update)
servico.delete(ServiceRoute.delete, ServiceController.delete)


export { Router }