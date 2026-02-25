import express from "express";
import {adicionarServico} from "./servico.js"

const app = express();



app.get("/", (req, res) => {
    res.send("Hello world");
});

app.post("/adicionar-servico", (req, res) => {
    const novoServico = req.body

    adicionarServico(novoServico)
})

app.listen(8080,() => {
    console.log("Server running on port 8080")
    
})