// Importa o pacote dotenv e carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o Banco de Dados
// Use a variável de ambiente para a URL do banco
const DB_URI = process.env.MONGODB_URI; 

mongoose.connect(DB_URI)
    .then(() => console.log('Conectado ao MongoDB!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Definir o schema (estrutura) do livro
const livroSchema = new mongoose.Schema({
    titulo: String,
    paginas: Number,
    isbn: String,
    editora: String
});

const Livro = mongoose.model('Livro', livroSchema);

// --- Rotas da API ---

// Listar todos os livros
app.get('/livros', async (req, res) => {
    const livros = await Livro.find();
    res.json(livros);
});

// Buscar livro pelo id
app.get('/livros/:id', async (req, res) => {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).send('Livro não encontrado');
    res.json(livro);
});

// Cadastrar novo livro
app.post('/livros', async (req, res) => {
    const novoLivro = new Livro(req.body);
    await novoLivro.save();
    res.status(201).json(novoLivro);
});

// Editar livro
app.put('/livros/:id', async (req, res) => {
    const livro = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!livro) return res.status(404).send('Livro não encontrado');
    res.json(livro);
});

// Deletar livro
app.delete('/livros/:id', async (req, res) => {
    const livro = await Livro.findByIdAndDelete(req.params.id);
    if (!livro) return res.status(404).send('Livro não encontrado');
    res.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});