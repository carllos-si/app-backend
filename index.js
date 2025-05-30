const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Modelo de Oferta
const Oferta = mongoose.model("Oferta", new mongoose.Schema({
  titulo: String,
  descricao: String,
  preco: Number,
  fornecedor: String,
  horario: String,
  criadoEm: { type: Date, default: Date.now }
}));

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado"))
.catch((err) => console.error("Erro ao conectar:", err));

// Rotas
app.get("/api/ofertas", async (req, res) => {
  const ofertas = await Oferta.find();
  res.json(ofertas);
});

app.post("/api/ofertas", async (req, res) => {
  const { title, description, price } = req.body;

  const oferta = new Oferta({
    titulo: title,
    descricao: description,
    preco: price
  });

  await oferta.save();
  res.status(201).json(oferta);
});

// Rota padrão
app.get("/", (req, res) => {
  res.send("API está rodando");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
