import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./index.scss";
import LivrosService from '../../api/LivrosService';
import logo from '../../assets/logo.png';

const LivrosCadastro = () => {
  const [livro, setLivro] = useState({
    titulo: '',
    num_paginas: '',
    isbn: '',
    editora: ''
  });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);

  const validarCampos = () => {
    return (
      livro.titulo.trim() !== '' &&
      livro.num_paginas !== '' &&
      Number.isInteger(Number(livro.num_paginas)) &&
      Number(livro.num_paginas) > 0 &&
      livro.isbn.trim() !== '' &&
      livro.editora.trim() !== ''
    );
  };

  async function createLivro(event) {
    event.preventDefault();
    setMensagem(null);
    setErro(null);

    if (!validarCampos()) {
      setErro('Preencha todos os campos corretamente. Número de páginas deve ser um número inteiro positivo.');
      return;
    }

    setLoading(true);
    const body = {
      titulo: livro.titulo.trim(),
      num_paginas: Number(livro.num_paginas),
      isbn: livro.isbn.trim(),
      editora: livro.editora.trim()
    };

    try {
      await LivrosService.cadastrarLivro(body);
      setMensagem('Livro cadastrado com sucesso!');
      setLivro({ titulo: '', num_paginas: '', isbn: '', editora: '' });
    } catch (error) {
      setErro(error.message || 'Erro ao cadastrar livro');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Header */}
      <div className="header">
        <NavLink to="/" className="logo-link">
          <img src={logo} alt="DNC Logo" className="logo" />
        </NavLink>
        <nav>
          <NavLink to="/livros" className={({ isActive }) => isActive ? "ativo" : ""}>
            Listar livros
          </NavLink>
          <NavLink to="/livros/cadastro" className={({ isActive }) => isActive ? "ativo" : ""}>
            Cadastrar livros
          </NavLink>
        </nav>
      </div>

      {/* Conteúdo da página */}
      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <div className='form-container'>
          <form id="formulario" onSubmit={createLivro}>
            <div className='form-group'>
              <label>Id</label>
              <input
                type="text"
                id='id'
                disabled
                placeholder="Gerado automaticamente"
              />
            </div>
            <div className='form-group'>
              <label>Título</label>
              <input
                type="text"
                id='titulo'
                required
                value={livro.titulo}
                onChange={(event) => setLivro({ ...livro, titulo: event.target.value })}
              />
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input
                type="number"
                id='num_paginas'
                required
                min="1"
                value={livro.num_paginas}
                onChange={(event) => setLivro({ ...livro, num_paginas: event.target.value })}
              />
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input
                type="text"
                id='isbn'
                required
                value={livro.isbn}
                onChange={(event) => setLivro({ ...livro, isbn: event.target.value })}
              />
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input
                type="text"
                id='editora'
                required
                value={livro.editora}
                onChange={(event) => setLivro({ ...livro, editora: event.target.value })}
              />
            </div>
            <div className='form-group'>
              <button type="submit" disabled={loading}>
                {loading ? 'CADASTRANDO...' : 'CADASTRAR LIVRO'}
              </button>
            </div>
            {mensagem && <p className="success-message">{mensagem}</p>}
            {erro && <p className="error-message">{erro}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default LivrosCadastro;
