const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const Sequelize = require("sequelize")

//View engine
app.set("view engine", "ejs")
//Static
app.use(express.static('public'))
//Body Parser
app.use(bodyParser.urlencoded({extends: false}))
app.use(bodyParser.json())


app.get("/", (req, res) => {
    res.render("index")
})

app.listen(8000, () => {
    console.log("SERVER ON!")
})