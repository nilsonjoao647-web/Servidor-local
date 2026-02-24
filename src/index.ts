import express from "express";

const app = express();

const constante ="true";

let variavel ="variavel";

app.get("/hello", (req, res) => {
    console.log("Hello world");
    res.send("Hello world");
});

app.listen(8080,() => {
    console.log("Server running on port 8080")
})