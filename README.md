📚 Projeto React + API Node - Biblioteca DNC
Este projeto é um sistema de biblioteca desenvolvido em React, consumindo uma API criada em Node.js. Ele permite listar, cadastrar, editar e remover livros de forma simples, intuitiva e responsiva.
🚀 Demonstração
	•	Frontend: https://rid186947-desafio.netlify.app/
	•	API: https://rid189947-desafio5.onrender.com/livros
✨ Funcionalidades
	•	Visualização de todos os livros cadastrados em formato de cards
	•	Cadastro de novos livros com formulário validado
	•	Edição dos dados de livros existentes
	•	Remoção de livros com confirmação de exclusão
	•	UI responsiva, moderna e amigável
	•	Mensagens de sucesso, erro, estado vazio (“Nenhum livro cadastrado”), loading e feedback visual para o usuário
🛠️ Tecnologias Utilizadas
Frontend
	•	React
	•	React Router
	•	SCSS
	•	Vite
Backend/API
	•	Node.js
	•	Express.js
	•	CORS
Deploy
	•	Netlify (Frontend)
	•	Render (Backend/API)
🌐 Como acessar e testar
	1.	Acesse o Frontend: https://rid186947-desafio.netlify.app/
	2.	Testar a API diretamente: https://rid189947-desafio5.onrender.com

📦 Instalação local
		É preciso Node.js instalado.
1. Clone o repositório
 
 git clone https://github.com/katgmrs/RID186947-Desafio5.git
cd RID186947-Desafio5

2. Instale e rode o Backend/API
   cd backend         # ajuste para o nome correto da pasta da API
npm install
npm start          # API em http://localhost:3001

3. Instale e rode o Frontend
 cd ../frontend     # ajuste para o nome correto da pasta do front
npm install
npm run dev        # App em http://localhost:5173

	O frontend está configurado para consumir a API local em desenvolvimento.
	•	Para produção, use as URLs do Netlify (frontend) e Render (API).

📝 Estrutura do projeto

RID186947-Desafio5
│
├── frontend      # Código React
│   ├── src
│   └── ...
│
├── backend       # Código Node.js/Express da API
│   ├── index.js
│   ├── data.js
│   └── ...
│
└── README.md 
