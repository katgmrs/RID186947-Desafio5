const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001/livros";

async function listarLivros() {
  const resposta = await fetch(API_BASE);
  if (!resposta.ok) throw new Error("Erro ao buscar livros");
  return await resposta.json();
}

async function obterLivro(id) {
  const resposta = await fetch(`${API_BASE}/${id}`);
  if (!resposta.ok) throw new Error("Livro não encontrado");
  return await resposta.json();
}

async function cadastrarLivro(dadosLivro) {
  const dados = { ...dadosLivro, paginas: Number(dadosLivro.paginas) };

  const resposta = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!resposta.ok) throw new Error("Erro ao cadastrar livro");
  return await resposta.json();
}

async function editarLivro(id, dadosLivro) {
  const dados = { ...dadosLivro, paginas: Number(dadosLivro.paginas) };

  const resposta = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!resposta.ok) throw new Error("Erro ao atualizar livro");
  return await resposta.json();
}

async function excluirLivro(id) {
  const resposta = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!resposta.ok) throw new Error("Erro ao deletar livro");
}

const LivrosService = {
  listarLivros,
  obterLivro,
  cadastrarLivro,
  editarLivro,
  excluirLivro,
};

export default LivrosService;