# 🛒 Sistema de Compras Online - NestJS

Este é um sistema de compras online desenvolvido em **NestJS** com **TypeORM**, utilizando **SQLite** como banco de dados e documentação via **Swagger**. O sistema permite cadastro de usuários, criação de carrinho, adição de produtos e finalização de compra.

---

## 🚀 Tecnologias Utilizadas

- **NestJS**
- **TypeORM**
- **SQLite**
- **Swagger (OpenAPI)**
- **Jest (testes unitários)**

---

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. Instale as dependências:

```bash
npm install
```

3. Rode a aplicação:

```bash
npm run start:dev
```

> Banco de dados `SQLite` será criado automaticamente como `db.sqlite` na raiz do projeto.

---

## 📘 Documentação da API

Após rodar o projeto, acesse:

```
http://localhost:3000/api
```

A documentação Swagger estará disponível com todos os endpoints e exemplos.

---

## 🧪 Testes

Execute os testes com:

```bash
npm run test
```

---

## 📂 Estrutura do Projeto

```
src/
├── auth/           # Autenticação (JWT)
├── cart/           # Carrinho de compras
├── cart-item/      # Itens do carrinho
├── product/        # Produtos
├── user/           # Usuários
├── app.module.ts   # Módulo principal
└── main.ts         # Ponto de entrada da aplicação
```

---

## ✅ Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Listagem e cadastro de produtos
- Criação e visualização de carrinho por usuário
- Adição e remoção de produtos no carrinho
- Finalização da compra

---

## 📌 TODO

- [ ] Adicionar autenticação nos endpoints sensíveis (ex: proteger rotas de carrinho)
- [ ] Melhorar cobertura de testes
- [ ] Deploy do projeto (Railway, Render ou Docker)

---

## 🧑‍💻 Desenvolvedor

**Gabriel Calado Cartaxo Rodrigues**

---

## 📄 Licença

Este projeto está sob a licença MIT.