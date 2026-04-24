import express, { type Request, type Response } from "express"
import { addServicesToDB, adicionarServico, apagarServico, deleteService, getAllServices, getServiceById, listarServicos, obterServico, updateService } from "./servico.js"
import { apagarPrestadoresDeServico, calcularOrcamento, criarPrestadorDeServico, editarPrestadordeServico, selecionarPrestadorPorNome, selecionarServicos } from "./orcamneto.js"
import type { inserirType, ServicoDBType, userType } from "./utils/types.js"
import db from "./lib/db.js"
import { createUser, getUsers, getUserById } from "./users.js"

const app = express()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

// rota para adicionar um serviço novo
app.post("/adicionar-servico", (req: Request, res: Response) => {
    const novoServico = req.body

    const addServicoResponse = adicionarServico(novoServico)

    res.json(addServicoResponse)
})

// rota para listar todos os servicos
app.get("/listar-servicos", (req: Request, res: Response) => {
    const listServicoResponse = listarServicos()

    res.json(listServicoResponse)
})

// rota para apagar um servico
app.delete("/apagar-servico", (req: Request, res: Response) => {
    const { nome } = req.query

    if (nome) {
        const apagarServicoResponse = apagarServico(nome as string)

        res.json(apagarServicoResponse)
    } else {
        res.json({
            message: "Nome do servico eh obrigatorio"
        })
    }
})

// rota para obter servico pelo nome 
app.get("/obter-servico", (req: Request, res: Response) => {
    const { nome } = req.query

    if (nome) {
        const obterServicoResponse = obterServico(nome as string)

        res.json(obterServicoResponse)
    } else {
        res.json({
            message: "Nome do servico eh obrigatorio"
        })
    }
})

// rota para selecionae servicos
app.post("/selecionar-servico", (req: Request, res: Response) => {
    const { nome } = req.body

    const selecionarServicoResponse = selecionarServicos(nome as string)

    res.json(selecionarServicoResponse)
})

// rota para calcular orcamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
    const { pedido } = req.body

    const calcularOrcamentoresponse = calcularOrcamento(pedido)
    res.json(calcularOrcamentoresponse)
})

app.listen(8080, () => {
    console.log("Server running on port 8080")
})

export async function inserirServico(servico: inserirType) {
    console.log("servicos inserido")

    try {
        const rows = await db.execute(
            'INSERT INTO table_servicos VALUES (?, ?, ?, ?, ?, ?)',
            [null, servico.nome, servico.descricao, servico.categoria, new Date(), new Date()]
        )

        return rows
    } catch (error) {
        console.log(error)
        return error
    }
}

//rota para selecionar prestador
app.post("/selecionar-prestador", (req: Request, res: Response) => {
    const { nomeDePrestador } = req.body;

    const selecionaPrestadorRespnse = selecionarPrestadorPorNome(
        nomeDePrestador as string,
    );

    res.json({
        status: selecionaPrestadorRespnse,
        message: "prestador servico selecionado com sucesso",
    });
});

//rota para criar prestadores de servico
app.post("/criar-prestador", (req: Request, res: Response) => {
    // pegar o corpo de requisitos com os dados do novo prestador
    const { novoPrestador } = req.body;

    // chamar a função de criar prestador de serviço
    const criarPrestadorResponse = criarPrestadorDeServico(novoPrestador);
    res.json(criarPrestadorResponse);
});

//rota para editar prestadores
app.put("/editar-prestador", (req: Request, res: Response) => {
    const { novoPrestador, nomeDoPrestador } = req.body;
    const editarPrestadorResponse = editarPrestadordeServico(
        nomeDoPrestador,
        novoPrestador,
    );
    res.json(editarPrestadorResponse);
});

//rota para apagar prestadores
app.delete("/apagar-prestador", (req: Request, res: Response) => {
    const { nomeDoPrestador } = req.query;
    if (nomeDoPrestador) {
        const apagarPrestadorResponse = apagarPrestadoresDeServico(
            nomeDoPrestador as string,
        );
        res.json(apagarPrestadorResponse);
    } else {
        res.json({
            message: "O nome do prestador apagado com sucesso",
        });
    }
});

// selecionar todos os utilizadores na base de dados
app.get("/get-users", async (req: Request, res: Response) => {
    const getUsersResponse = await getUsers();

    res.json(getUsersResponse);
});

// selecionar todos os utilizadores por id
app.get("/get-users-by-id", async (req: Request, res: Response) => {
    const { id } = req.query;

    if (id) {
        const getUsersByIdResponse = await getUserById(id as string);

        if (!getUsersByIdResponse) {
            res.status(404).json({
                status: "error",
                message: "Utilizador nao encontrado",
                data: null,
            });
        }

        res.status(200).json({
            status: "success",
            message: "Utilizador encontrado",
            data: getUsersByIdResponse,
        });
    }
});

//rota incerir um utilizador na base de dados
app.post("/create-user", async (req: Request, res: Response) => {
    const user: userType = req.body;

    if (!user) {
        res.status(404).json({
            status: "error",
            message: "Dados de utilizador invalido",
            data: null
        })
    }
    const createUserResponse = await createUser(
        user
    );
    res.json(createUserResponse);

})

app.post("/creat-service", async (req: Request, res: Response) => {

    const newService: ServicoDBType = req.body

    if (!newService) {
        res.status(400).json({
            status: "error",
            message: "Dados de servico invalido",
            data: null
        })
    }


    console.log(newService)

    const creatServiceResponse = await addServicesToDB(newService)

    if (creatServiceResponse === null) {
        res.status(400).json({
            status: "error",
            message: "Erro ao criar servico",
            data: null
        })
    }

    res.status(200).json({
        status: "error",
        message: "servico criado com sucesso",
        data: creatServiceResponse
    })

});

app.get("get-service-by-id", async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
        res.status(400).json({
            status: "error",
            message: "ID obrigatorio",
            data: null
        })
    }

    const getServiceByIdResponse = await getServiceById(id as string)

    if (!getServiceByIdResponse) {
        return res.status(400).json({
            status: "error",
            message: "Servico nao encontrado",
            data: null
        })
    }

    res.status(200).json({
        status: "error",
        message: "Servico encontrado",
        data: getServiceByIdResponse
    })
})

app.get("get-all-services", async (req: Request, res: Response) => {
    const getAllServicesResponse = await getAllServices()

    if (!getAllServicesResponse) {
        res.status(400).json({
            status: "error",
            message: "Erro ao selecionar servicos",
            data: null
        })
    }

    res.status(200).json({
        status: "error",
        message: "Servico encontrado",
        data: getAllServicesResponse
    })
})

app.put("/update-service-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params

    const updatedServico: ServicoDBType = req.body

    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID obrigatorio",
            data: null
        })
    }

    if (!updatedServico) {
        return res.status(400).json({
            status: "error",
            message: "Dados de servicos invalidos",
            data: null
        })
    }

    const updatedServicoResponse = await updateService(id as string, updatedServico)

    if (!updatedServicoResponse) {
        return res.status(400).json({
            status: "error",
            message: "Error ao atualizar servico",
            data: null
        })
    }


    return res.status(400).json({
        status: "success",
        message: "servico atualizado com sucesso",
        data: null
    })

})

app.delete("/delete-service-by-id/:id", async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            status: "error",
            message: "ID obrigatorio",
            data: null
        })
    }

    const deleteServicoResponse = await deleteService(id as string)
    if (!deleteServicoResponse) {
        return res.status(400).json({
            status: "error",
            message: "Erro ao apagar servico",
            data: null
        })
    }

    return res.status(200).json({
        status: "success",
        message: "Servico apagado com success",
        data: deleteServicoResponse
    })

})
app.listen(8080, () => {
    console.log("Server running on port 8080")
})