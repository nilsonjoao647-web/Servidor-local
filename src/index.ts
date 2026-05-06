import "dotenv/config"
import express, { type Request, type Response } from "express"
import { Router as serviceRouter} from "./routes/servico.route.js"
import {Router as orcamentoRouter} from "./routes/orcamento.route.js"
import {Router as prestadorRouter} from "./routes/prestador.route.js"
import {Router as userRouter} from "./routes/users.route.js"
import {Router as propostaRouter } from "./routes/proposta.route.js"
import {Router as prestasao_ServicoRouter} from "./routes/prestacao_servico.route.js"
import { swaggerSpec } from "./docs/swagger.js"
import swaggerUi from "swagger-ui-express"
import { resolvers, typeDefs } from "./graphq/index.js"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@as-integrations/express5"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors({
    origin: " http://localhost:3000",
    credentials: true
}))

app.use("/service", serviceRouter)
app.use("/orcamento", orcamentoRouter)
app.use("/prestador", prestadorRouter)
app.use("/user", userRouter)
app.use("/proposta", propostaRouter)
app.use("/prestasaoServico", prestasao_ServicoRouter)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const graphqlServer = new ApolloServer ({
    typeDefs,
    resolvers,
})

await graphqlServer.start()

app.use("/graphql",
    expressMiddleware(graphqlServer, {
        context: async ({ req }) => ({
            token: req.headers.authorization,
            DH_HOST: process.env.DH_HOST,
            DB_USER: process.env.DB_USER,
            DB_PASSWORD: process.env.DB_PASSWORD,
            DB_NAME: process.env.DB_NAME,
        }),
    })
)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

app.listen(8080, () => {
    console.log("Server running on port 8080")
})