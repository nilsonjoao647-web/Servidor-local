import { Router } from "express"
import { ServiceController} from "../controllers/servico.controller.js"
import { authorize } from "../security/auth.middleware.js"



const ServiceRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id",
    getAllDetailed: "/all-detailed"
}

const router = Router()

router.post(ServiceRoute.create, authorize ([Role.ADMIN]) ServiceController.CreateServico)
router.get(ServiceRoute.getById, authorize ([Role.ADMIN, Role.CLIENTE]) ServiceController.getAll)
router.get(ServiceRoute.getAll, authorize ([Role.ADMIN]) ServiceController.getAll)
router.put(ServiceRoute.update, authorize ([Role.ADMIN]) ServiceController.update)
router.delete(ServiceRoute.delete, authorize ([Role.ADMIN]) ServiceController.delete)
router.get(ServiceRoute.getAllDetailed, authorize ([Role.ADMIN]) ServiceController.getAllServicoDetalhado)


export { Router }