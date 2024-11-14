const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import JWT for authentication

const SALT_ROUNDS = 10;
const SECRET_KEY = 'your_secret_key'; // Replace with a secure secret key

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

// Create tables if they don't exist
db.run(`
  CREATE TABLE IF NOT EXISTS owners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    breed TEXT,
    age INTEGER,
    gender TEXT,
    weight REAL,
    type TEXT,
    owner_id INTEGER,
    FOREIGN KEY (owner_id) REFERENCES owners (id)
  )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  }
});

// Endpoint to register a new owner with hashed password
app.post('/api/owners', async (req, res) => {
  const { first_name, last_name, phone_number, email, password } = req.body;

  // Validate input fields (basic check for required fields)
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if the email already exists
  db.get('SELECT * FROM owners WHERE email = ?', [email], async (err, owner) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (owner) {
      return res.status(400).json({ error: 'Email is already taken' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const query = `INSERT INTO owners (first_name, last_name, phone_number, email, password) VALUES (?, ?, ?, ?, ?)`;
      db.run(query, [first_name, last_name, phone_number, email, hashedPassword], function (err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ message: 'Owner created successfully', ownerId: this.lastID });
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});


// Login endpoint to authenticate owner and issue JWT
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM owners WHERE email = ?', [email], async (err, owner) => {
    if (err) return res.status(500).json({ error: 'Internal server error' });
    if (!owner) return res.status(404).json({ error: 'Owner not found' });

    const isPasswordValid = await bcrypt.compare(password, owner.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

    // Issue JWT
    const token = jwt.sign({ id: owner.id, email: owner.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
});

// Middleware to authenticate and get the owner's ID from the JWT
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Access denied, token missing!' });

  jwt.verify(token, SECRET_KEY, (err, owner) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.ownerId = owner.id; // Assign ownerId to request for CRUD operations
    next();
  });
}

// Add a new pet (owner must be authenticated)
app.post('/api/pets', authenticateToken, (req, res) => {
  const { name, breed, age, gender, weight, type } = req.body;
  const ownerId = req.ownerId;

  const query = `INSERT INTO pets (name, breed, age, gender, weight, type, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(query, [name, breed, age, gender, weight, type, ownerId], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ message: 'Pet added successfully', petId: this.lastID });
  });
});

// Get all pets for the authenticated owner
app.get('/api/owners/me/pets', authenticateToken, (req, res) => {
  const ownerId = req.ownerId;

  const query = `SELECT * FROM pets WHERE owner_id = ?`;
  db.all(query, [ownerId], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (rows.length === 0) {
      res.status(404).json({ message: 'No pets found for this owner' });
      return;
    }
    res.json({ data: rows });
  });
});


// Get a single pet by ID (owner must own the pet)
app.get('/api/pets/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const ownerId = req.ownerId;

  db.get('SELECT * FROM pets WHERE id = ? AND owner_id = ?', [id, ownerId], (err, row) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!row) return res.status(404).json({ message: 'Pet not found or access denied' });
    res.json(row);
  });
});

// Update a pet by ID (owner must own the pet)
app.put('/api/pets/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, breed, age, gender, weight, type } = req.body;
  const ownerId = req.ownerId;

  const query = `UPDATE pets SET name = ?, breed = ?, age = ?, gender = ?, weight = ?, type = ? WHERE id = ? AND owner_id = ?`;
  db.run(query, [name, breed, age, gender, weight, type, id, ownerId], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'Pet not found or access denied' });
    res.json({ message: 'Pet updated successfully' });
  });
});

// Delete a pet by ID (owner must own the pet)
app.delete('/api/pets/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const ownerId = req.ownerId;

  db.run('DELETE FROM pets WHERE id = ? AND owner_id = ?', [id, ownerId], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'Pet not found or access denied' });
    res.json({ message: 'Pet deleted successfully' });
  });
});

// Start the server
const PORT = 5600;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
