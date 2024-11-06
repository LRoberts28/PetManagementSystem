const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./pet_management_system.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

app.post('/api/pets', (req, res) => {
    const { name, breed, age, gender, weight, type, owner_id } = req.body;
  
    // SQL query to insert new pet into the database
    const query = `INSERT INTO pets (name, breed, age, gender, weight, type, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
    db.run(query, [name, breed, age, gender, weight, type, owner_id], function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.status(201).json({
        message: 'Pet added successfully',
        petId: this.lastID, // Return the ID of the inserted pet
      });
    });
  });

// Example API endpoint
app.get('/api/pets', (_req, res) => {
  db.all('SELECT * FROM pets', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Start the server
const PORT = 5600;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});