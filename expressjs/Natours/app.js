const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Hello from server!' });
});
const port = 3000;
const host = '127.0.0.1';
app.listen(port, host, () => {
  console.log(`express app running on ${host}:${port}`);
});
