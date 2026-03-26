import { Router } from "express"
import { PrestadorController } from "../controllers/prestador.controller.js"



const PrestadorRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const Prestador = Router()
Prestador.post(PrestadorRoute.create, PrestadorController.createPrestador)
Prestador.get(PrestadorRoute.getById, PrestadorController.getAllPrestador)
Prestador.get(PrestadorRoute.getAll, PrestadorController.getAllPrestador)
Prestador.put(PrestadorRoute.update, PrestadorController.updatePrestador)
Prestador.delete(PrestadorRoute.delete, PrestadorController.deletePrestador)


export { Router }