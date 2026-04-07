const express = require('express');
const hobiRouter = require('./hobiler/hobiler-router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.json({ mesaj: 'Hobi API çalışıyor' });
});

server.use('/api/hobiler', hobiRouter);

// Hata yönetimi middleware
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(500).json({ message: err.message });
});

module.exports = server;
