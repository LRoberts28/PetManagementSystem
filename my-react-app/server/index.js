const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt

const SALT_ROUNDS = 10;

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

// Create the pets table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    breed TEXT,
    age INTEGER,
    gender TEXT,
    weight REAL,
    type TEXT,
    owner_id INTEGER
  )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  }
});

// Add a new pet
app.post('/api/pets', (req, res) => {
  const { name, breed, age, gender, weight, type, owner_id } = req.body;

  const query = `INSERT INTO pets (name, breed, age, gender, weight, type, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(query, [name, breed, age, gender, weight, type, owner_id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({
      message: 'Pet added successfully',
      petId: this.lastID,
    });
  });
});

// Get all pets
app.get('/api/pets', (_req, res) => {
  db.all('SELECT * FROM pets', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Get a single pet by ID
app.get('/api/pets/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM pets WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ message: 'Pet not found' });
      return;
    }
    res.json(row);
  });
});

// Update a pet by ID
app.put('/api/pets/:id', (req, res) => {
  const { id } = req.params;
  const { name, breed, age, gender, weight, type, owner_id } = req.body;

  const query = `
    UPDATE pets
    SET name = ?, breed = ?, age = ?, gender = ?, weight = ?, type = ?, owner_id = ?
    WHERE id = ?
  `;
  db.run(query, [name, breed, age, gender, weight, type, owner_id, id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json({ message: 'Pet updated successfully' });
  });
});

// Delete a pet by ID
app.delete('/api/pets/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM pets WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json({ message: 'Pet deleted successfully' });
  });
});


// Create owners table with email and password
db.run(`
  CREATE TABLE IF NOT EXISTS owners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );
`, (err) => {
  if (err) {
    console.error('Error creating owners table:', err.message);
  } else {
    console.log('Owners table created or already exists');
  }
});

// Endpoint to create a new owner with hashed password
app.post('/api/owners', async (req, res) => {
  const { first_name, last_name, phone_number, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert new owner into the database
    const query = `INSERT INTO owners (first_name, last_name, phone_number, email, password) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [first_name, last_name, phone_number, email, hashedPassword], function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(201).json({
          message: 'Owner created successfully',
          ownerId: this.lastID,
        });
      }
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = 5600;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
