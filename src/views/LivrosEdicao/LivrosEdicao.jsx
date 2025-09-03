import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import "./index.scss";
import LivrosService from '../../api/LivrosService';
import logo from '../../assets/logo.png'; // Adicione esta linha para importar o logo

const LivrosEdicao = () => {
  let { livroId } = useParams();
  const navigate = useNavigate();
  
  const [livro, setLivro] = useState({});
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);

  async function getLivro() {
    try {
      const data = await LivrosService.obterLivro(livroId);
      console.log('Livro carregado:', data);
      setLivro(data);
    } catch (error) {
      setErro('Erro ao carregar livro: ' + error.message);
    }
  }

  const validarCampos = () => {
    return (
      livro.titulo !== undefined && livro.titulo.trim() !== '' &&
      livro.num_paginas !== undefined && livro.num_paginas !== '' && 
      Number.isInteger(Number(livro.num_paginas)) &&
      livro.isbn !== undefined && livro.isbn.trim() !== '' &&
      livro.editora !== undefined && livro.editora.trim() !== ''
    );
  };

  async function editLivro() {
    setMensagem(null);
    setErro(null);

    if (!validarCampos()) {
      setErro('Preencha todos os campos corretamente. Número de páginas deve ser um número inteiro.');
      return;
    }

    setLoading(true);
    
    const body = {
      titulo: livro.titulo.trim(),
      num_paginas: Number(livro.num_paginas),
      isbn: livro.isbn.trim(),
      editora: livro.editora.trim()
    };

    console.log('Dados para edição:', body);

    try {
      const response = await LivrosService.editarLivro(Number(livroId), body);
      console.log('Resposta da API:', response);
      setMensagem('Livro atualizado com sucesso!');
      
      // Redirecionar para listagem após 2 segundos
      setTimeout(() => {
        navigate('/livros');
      }, 2000);
      
    } catch (error) {
      console.error('Erro na edição:', error);
      setErro(error.message || 'Erro ao atualizar livro');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (livroId) {
      getLivro();
    }
  }, [livroId]);

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
        <h1>Edição de Livros</h1>
        <div className='form-container'>
          <form id="formulario">
            <div className='form-group'>
              <label>Id</label>
              <input
                type="text"
                disabled
                value={livro.id || ''}
                placeholder="ID do livro"
              />
            </div>
            <div className='form-group'>
              <label>Título</label>
              <input
                type="text"
                required
                onChange={(event) => { setLivro({ ...livro, titulo: event.target.value }) }}
                value={livro.titulo || ''}
              />
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input
                type="number"
                required
                onChange={(event) => { setLivro({ ...livro, num_paginas: event.target.value }) }}
                value={livro.num_paginas || ''}
              />
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input
                type="text"
                required
                onChange={(event) => { setLivro({ ...livro, isbn: event.target.value }) }}
                value={livro.isbn || ''}
              />
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input
                type="text"
                required
                onChange={(event) => { setLivro({ ...livro, editora: event.target.value }) }}
                value={livro.editora || ''}
              />
            </div>
            <div className='form-group'>
              <button type="button" disabled={loading} onClick={() => { editLivro() }}>
                {loading ? 'ATUALIZANDO...' : 'ATUALIZAR LIVRO'}
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

export default LivrosEdicao;
