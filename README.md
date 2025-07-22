# Exercício 4 – Aula 3: Protegendo a aplicação com CSRF (Double Submit Cookie)

Este projeto implementa proteção contra ataques CSRF utilizando a biblioteca `csurf`, seguindo o padrão **Double Submit Cookie**, conforme solicitado no exercício da Aula 3.

## 🔒 Objetivo

Proteger rotas que alteram dados (POST, PUT, DELETE...) contra requisições maliciosas vindas de outros sites, sem usar sessões no servidor.

## 🧰 Tecnologias

- Node.js
- Express
- csurf
- cookie-parser

## 📁 Estrutura do Projeto

```
csrf-protection/
├── public/
│   └── index.html         # Página que testa o envio do token
├── server.js              # Backend com proteção CSRF
├── package.json
```

## 🚀 Como executar

1. Extraia o projeto zipado.
2. No terminal, execute:

```bash
npm install
npm start
```

3. Acesse `http://localhost:3000` no navegador.
4. Clique no botão **"Enviar POST"**.
5. Verifique o alerta confirmando que o token CSRF foi validado com sucesso.

## ✅ Funcionamento (Double Submit Cookie)

- O servidor envia um **token CSRF**:
  - Como **cookie HTTP-only** (`XSRF-TOKEN`)
  - Como **resposta JSON visível** (`csrfToken`)
- O cliente usa o token do JSON e envia no **cabeçalho `x-csrf-token`**
- O middleware `csurf` compara os dois valores:
  - Se forem iguais: requisição é aceita.
  - Se forem diferentes: requisição é rejeitada com erro 403.

## 📷 Comprovação

Foi exibida a seguinte mensagem após o envio da requisição:

```
Requisição POST aceita. CSRF token válido.
```

Isso confirma que o token foi enviado e validado corretamente.

## 📌 Observações

- O projeto **não utiliza sessões**.
- A proteção segue exatamente o padrão Double Submit Cookie.
- O token é renovado a cada nova requisição ao endpoint `/csrf-token`.

---

Desenvolvido para fins didáticos na disciplina de Segurança da Informação.
