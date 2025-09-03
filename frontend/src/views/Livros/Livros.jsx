import "./index.scss";
import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import LivrosService from '../../api/LivrosService';
import logo from "../../assets/logo.png";
import editIcon from "../../assets/edit-icon.svg";
import trashIcon from "../../assets/trash-icon.svg";

export default function Livros() {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function carregarLivros() {
    try {
      setLoading(true);
      const dados = await LivrosService.listarLivros();
      setLivros(dados);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarLivros();
  }, []);

  async function handleExcluir(id) {
    if (window.confirm("Deseja realmente excluir este livro?")) {
      try {
        await LivrosService.excluirLivro(id);
        carregarLivros();
      } catch (error) {
        alert(error.message);
      }
    }
  }

  if (erro) {
    return (
      <div className="error-page">
        <div className="error-content">
          <h2>Ops! Algo deu errado</h2>
          <p>Erro: {erro}</p>
          <button onClick={() => window.location.reload()}>
            Tentar Novamente
          </button>
        </div>
      </div>
    );
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
      <div className="pagina-livros">
        <h1>Escolha o seu livro</h1>
        
        <div className="cards-container">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Carregando livros...</p>
            </div>
          ) : livros.length === 0 ? (
            <div className="empty-state">
              <h2>Nenhum livro encontrado</h2>
            </div>
          ) : (
            livros.map((l) => (
              <div className="livro-card" key={l.id}>
                <div className="livro-titulo">{l.titulo}</div>
                <div className="livro-editora">{l.editora}</div>
                <div className="livro-actions">
                  <button
                    className="edit"
                    title="Editar"
                    onClick={() => navigate(`/livros/editar/${l.id}`)}
                  >
                    <img src={editIcon} alt="Editar" width="20" height="20" />
                  </button>
                  <button
                    className="del"
                    title="Deletar"
                    onClick={() => handleExcluir(l.id)}
                  >
                    <img src={trashIcon} alt="Deletar" width="20" height="20" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
