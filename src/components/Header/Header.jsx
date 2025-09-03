import React from 'react';
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./index.scss";
function Header() {
  return (
    <div className='header'>
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
  );
}
export default Header;
