const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta= require("./database/Pergunta");

// database
connection
  .authenticate()
  .then(() => {
    console.log('conexão feita com sucesso!');
  })
  .catch((err) => {
    console.log('erro', err);
  })

// configuração para o express utilizar o EJS como view engine
app.set("view engine", "ejs");
app.use(express.static('public'));

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// rota
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;

  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect("/");
  });
})

app.listen(8080, () => {
  console.log("App rodando!")
});