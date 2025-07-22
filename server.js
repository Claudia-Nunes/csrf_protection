const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const path = require('path');

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const csrfProtection = csrf({ cookie: true });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/csrf-token', csrfProtection, (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: true });
  res.json({ csrfToken: req.csrfToken() });
});

app.post('/process', csrfProtection, (req, res) => {
  res.send('Requisição POST aceita. CSRF token válido.');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
