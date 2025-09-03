const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let livros = [];
let idAtual = 1;

// Listar todos os livros
app.get('/livros', (req, res) => {
  res.json(livros);
});

// Buscar livro pelo id
app.get('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const livro = livros.find(l => l.id === id);
  if (!livro) return res.status(404).send('Livro não encontrado');
  res.json(livro);
});

// Cadastrar novo livro
app.post('/livros', (req, res) => {
  const { titulo, paginas, isbn, editora } = req.body;
  const livro = { id: idAtual++, titulo, paginas, isbn, editora };
  livros.push(livro);
  res.status(201).json(livro);
});

// Editar livro
app.put('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const livroIndex = livros.findIndex(l => l.id === id);
  if (livroIndex === -1) return res.status(404).send('Livro não encontrado');

  const { titulo, paginas, isbn, editora } = req.body;
  livros[livroIndex] = { id, titulo, paginas, isbn, editora };

  res.json(livros[livroIndex]);
});

// Deletar livro
app.delete('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const livroIndex = livros.findIndex(l => l.id === id);
  if (livroIndex === -1) return res.status(404).send('Livro não encontrado');

  livros.splice(livroIndex, 1);
  res.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
