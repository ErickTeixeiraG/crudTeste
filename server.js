// importacoes/ bibliotecas
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
// definir o sv
const app = express();
const port = 5000;

// conecta o bd 
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crudTeste',
  password: 'AudaciosCard123',
  port: 5432,
});

// pra puxar em json
app.use(bodyParser.json());

// c
app.post('/usuarios', (req, res) => {
  const { nome, email  } = req.body;
  pool.query('insert into usuarios (nome, email) values ($1, $2) returning usuarioId, email, nome', [nome, email], (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).json(result.rows[0]);
    }
  });
});

// r
app.get('/usuarios', (req, res) => {
  pool.query('select usuarioId, email, nome from usuarios', (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(result.rows);
    }
  });
});

// u
app.put('/usuarios/:id', (req, res) => {
  const { usuarioId } = req.params;
  const { nome } = req.body;
  pool.query('update usuario set nome = $1 where usuarioId = $2 returning usuarioId, email, nome', [nome, usuarioId], (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(result.rows[0]);
    }
  });
});

// d
app.delete('/usuarios/:id', (req, res) => {
  const { usuarioId } = req.params;
  pool.query('delete from usuarios where usuarioId = $1', [usuarioId], (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ message: 'Item deleted' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
