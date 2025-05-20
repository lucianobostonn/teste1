// Esse http é um módulo nativo do Node.js para criar servidores HTTP
const express = require("express")
const http = require("http")
const socketIo = require("socket.io")

// Este io é a instância do servidor Socket.io, que vai escutar as conexões websocket no nosso servidor HTTP.
const app = express()
const server = http.createServer(app)
const io = socketIo(server)


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")

})



io.on("connection", (socket) => {
    console.log("Usuário conectado")

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg)
    })

    socket.on("disconnect", () => {
        console.log("Usuário desconectado")
    })
})



const Porta = process.env.PORT || 3100

server.listen(Porta, () => {
    console.log(`Servidor rodando na porta ${Porta}`)
})

