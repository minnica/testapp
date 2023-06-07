const express = require("express")

const app = express()

app.set("view engine", "ejs")

app.get("/garatachia", (req, res) => {
// res.send("Adio chula garatachia")

res.render("index")
})

app.listen(3000, (req, res) => {
console.log("Corriendo en el puerto 3000")
})