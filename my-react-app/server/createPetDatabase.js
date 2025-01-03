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
      email TEXT NOT NULL UNIQUE, -- Ensures no two owners can have the same email
      password TEXT NOT NULL -- Stores the hashed password for authentication
    );
  `);

  // Create appointments table
  db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pet_id INTEGER,
      date TEXT NOT NULL,
      type TEXT NOT NULL,
      reason TEXT NOT NULL,
      weight DECIMAL(5,2) DEFAULT NULL,
      FOREIGN KEY (pet_id) REFERENCES pets(id)
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
    INSERT INTO owners (first_name, last_name, phone_number, email, password) VALUES
      ('John', 'Doe', '123-456-7890', 'johndoe@example.com', 'hashed_password_1'),
      ('Jane', 'Smith', '234-567-8901', 'janesmith@example.com', 'hashed_password_2'),
      ('Alice', 'Johnson', '345-678-9012', 'alicejohnson@example.com', 'hashed_password_3'),
      ('Bob', 'Williams', '456-789-0123', 'bobwilliams@example.com', 'hashed_password_4'),
      ('Charlie', 'Brown', '567-890-1234', 'charliebrown@example.com', 'hashed_password_5');

  `);

  // Insert sample pets
  db.run(`
    INSERT INTO pets (name, breed, age, gender, weight, type, owner_id)
    VALUES
    ('Rosco', 'Basset Hound', 5, 'Male', 30.5, 'Dog', 6),
    ('Bella', 'Siamese', 3, 'Female', 8.2, 'Cat', 2);
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
