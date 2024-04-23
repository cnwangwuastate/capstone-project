const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/plans', (req, res) => {
  db.all('SELECT * FROM plans', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
