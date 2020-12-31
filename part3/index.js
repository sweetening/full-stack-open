const http = require('http');

const express = require('express');
const app = express();

let entries = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Charlotte",
    "number": "39-24-6923122",
    "id": 5
  },
  {
    "name": "Ada Lovelace",
    "number": "069-420876",
    "id": 6
  },
  {
    "name": "hownow",
    "number": "234-3425082",
    "id": 8
  },
  {
    "name": "Sanja",
    "number": "420-6969696",
    "id": 9
  },
  {
    "name": "Maya",
    "number": "123-24325622",
    "id": 10
  }
];

app.get('/', (request, response) => {
  response.send('<h1>New person!</h1>')
});

app.get('/entries', (request, response) => {
  response.json(entries)
});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

