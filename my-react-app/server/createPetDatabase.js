const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database or open an existing one
const db = new sqlite3.Database('./pet_management_system.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database');
  }
});

// Create tables for pets, owners, appointments, and pet types
db.serialize(() => {
  // Create pets table
  db.run(`
    CREATE TABLE IF NOT EXISTS pets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      breed TEXT,
      age INTEGER,
      gender TEXT,
      weight REAL,
      type TEXT NOT NULL,
      owner_id INTEGER,
      FOREIGN KEY(owner_id) REFERENCES owners(id)
    );
  `);

  // Create owners table
  db.run(`
    CREATE TABLE IF NOT EXISTS owners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      phone_number TEXT,
      email TEXT
    );
  `);

  // Create appointments table
  db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id INTEGER,
      date TEXT,
      time TEXT,
      description TEXT,
      FOREIGN KEY(pet_id) REFERENCES pets(id)
    );
  `);

  // Create pet types table (for categorizing pets, like Dog, Cat, etc.)
  db.run(`
    CREATE TABLE IF NOT EXISTS pet_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `);

  // Insert sample pet types
  const petTypes = ['Dog', 'Cat', 'Bird', 'Reptile', 'Fish'];
  const stmt = db.prepare('INSERT INTO pet_types (name) VALUES (?)');
  petTypes.forEach(type => {
    stmt.run(type);
  });
  stmt.finalize();

  // Insert sample owners
  db.run(`
    INSERT INTO owners (first_name, last_name, phone_number, email)
    VALUES
    ('John', 'Doe', '555-1234', 'john.doe@example.com'),
    ('Jane', 'Smith', '555-5678', 'jane.smith@example.com');
  `);

  // Insert sample pets
  db.run(`
    INSERT INTO pets (name, breed, age, gender, weight, type, owner_id)
    VALUES
    ('Rex', 'German Shepherd', 5, 'Male', 30.5, 'Dog', 1),
    ('Bella', 'Siamese', 3, 'Female', 8.2, 'Cat', 2);
  `);

  // Insert sample appointments
  db.run(`
    INSERT INTO appointments (pet_id, date, time, description)
    VALUES
    (1, '2024-11-10', '10:00', 'Annual checkup'),
    (2, '2024-11-12', '14:30', 'Vaccination');
  `);

  console.log('Tables and sample data created successfully');
});

// Close the database connection after setup
db.close((err) => {
  if (err) {
    console.error('Error closing the database:', err.message);
  } else {
    console.log('Database connection closed');
  }
});
