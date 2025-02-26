# API Personal-library

## Descrição

A API Personal-Library foi desenvolvida com o intuito de servir como ferramenta para meus estudos pessoais sobre desacoplamento e introdução aos conceitos de Clean Architecture. Por esse motivo, ainda há código duplicado e boilerplate, o que implicará em uma refatoração futura conforme eu aprofundar meus conhecimentos nesses tópicos.

Além disso, a API surgiu com a pretensão de facilitar o gerenciamento do meu acervo pessoal de livros, tanto físicos quanto digitais. Ainda há várias funcionalidades que pretendo implementar, como a integração com um bucket em alguma cloud storage para armazenamento das capas dos livros e/ou livros digitais em formato PDF. À medida que a aplicação foi sendo idealizada, decidi adicionar um sistema de gerenciamento de usuários para possibilitar que essa ferramenta fosse utilizada por outras pessoas.

Atualmente, a Personal-Library, apesar de passível de melhorias, conta com CRUDs de usuários, livros e coleções de livros, além de autenticação de usuários com token JWT e integração com o banco de dados MongoDB Atlas através do ODM Mongoose.

---

## Instalação

Antes de começar, certifique-se de ter o Node.js e o npm instalados em sua máquina.

**1. Clone o Repositório:**
`git clone `

**2. Navegue até o Diretório do Projeto:**
`cd `

**3. Instale as Dependências:**
`npm install`

**4. Prepare o Husky**
`npm run rusky:prepare`

---

## Scripts Disponíveis

**- Compilação do Código:**
`npm run build`

**- Iniciar a Aplicação:**
`npm start`

**- Modo de Desenvolvimento:**
`npm run start:dev`

**- Execução de Testes:**
`npm test`

**- Testes em Modo de Observação:**
`npm run test:watch`

---

## Contribuição

1. Faça o fork do projeto [Fork](https://github.com/Lucas-Amorim-Almeida/personal-library/fork)
2. Crie uma branch para sua modificação (git checkout -b feature/nova-feature)
3. Faça o commit das suas alterações (git commit -am 'Adicionando nova feature')
4. Faça o push para a branch (git push origin feature/nova-feature)
5. Crie um novo Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

© 2025 API Personal-Library. Desenvolvido por [Lucas Amorim Almeida](https://github.com/Lucas-Amorim-Almeida)
