import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import "./index.scss";
import LivrosService from '../../api/LivrosService';
import logo from '../../assets/logo.png';

const LivrosEdicao = () => {
  const { livroId } = useParams();
  const navigate = useNavigate();
  
  const [livro, setLivro] = useState(null); // Corrigido: Inicializado com 'null' para verificar se os dados já foram carregados
  const [loading, setLoading] = useState(true); // Corrigido: Começa com 'true' para indicar que está carregando
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Corrigido: A lógica de buscar o livro é colocada dentro do useEffect
    async function getLivro() {
      setLoading(true); // Indica que o carregamento iniciou
      setErro(null); // Limpa erros anteriores
      try {
        const data = await LivrosService.obterLivro(livroId);
        setLivro(data);
      } catch (error) {
        console.error('Erro na requisição:', error);
        // Corrigido: O status 404 geralmente vem no objeto de resposta do erro
        setErro(error.response?.status === 404 ? 'Livro não encontrado' : 'Erro ao carregar livro');
      } finally {
        setLoading(false); // Indica que o carregamento terminou
      }
    }

    if (livroId) {
      getLivro();
    }
  }, [livroId]);

  const validarCampos = () => {
    return (
      livro?.titulo?.trim() !== '' &&
      livro?.paginas !== '' && 
      Number.isInteger(Number(livro?.paginas)) &&
      livro?.isbn?.trim() !== '' &&
      livro?.editora?.trim() !== ''
    );
  };

  async function editLivro() {
    setMensagem(null);
    setErro(null);

    if (!validarCampos()) {
      setErro('Preencha todos os campos corretamente.');
      return;
    }

    setLoading(true);
    
    const body = {
      titulo: livro.titulo.trim(),
      paginas: Number(livro.paginas),
      isbn: livro.isbn.trim(),
      editora: livro.editora.trim()
    };

    try {
      await LivrosService.editarLivro(livroId, body);
      setMensagem('Livro atualizado com sucesso!');
      
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
  
  // Corrigido: Exibe mensagem de erro ou carregamento
  if (loading) return <div>Carregando...</div>;
  if (erro) return <div className="error-message">{erro}</div>;
  if (!livro) return <div>Livro não encontrado.</div>;
  
  // Corrigido: Adicionado return do JSX do formulário, com o botão no 'onSubmit'
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
          <form id="formulario" onSubmit={(event) => { event.preventDefault(); editLivro(); }}>
            <div className='form-group'>
              <label>Id</label>
              <input
                type="text"
                disabled
                value={livro._id || ''}
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
                onChange={(event) => { setLivro({ ...livro, paginas: event.target.value }) }}
                value={livro.paginas || ''}
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
              <button type="submit" disabled={loading}>
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