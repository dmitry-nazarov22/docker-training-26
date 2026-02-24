const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

async function initializeTable() {
  const createRes = await createTable();
  console.log(createRes);
  const insertRes = await insertData();
  console.log(insertRes);
}

function createTable() {
  return new Promise((resolve, reject) => {
    // Create a table
    db.run(
      `CREATE TABLE IF NOT EXISTS locations
            (id INTEGER PRIMARY KEY, name TEXT, lat REAL, lng REAL)`,
      (err) => {
        if (err) {
          return reject(err);
        }
        resolve("Table created successfully");
      },
    );
  });
}

function insertData() {
  return new Promise((resolve, reject) => {
    // Insert data — the ? placeholders prevent SQL injection
    db.run(
      "INSERT INTO locations (name, lat, lng) VALUES (?, ?, ?)",
      ["Helsinki", 60.1699, 24.9384],
      (err) => {
        if (err) return reject(err);

        // После успеха вставляем Тампере
        db.run(
          "INSERT INTO locations (name, lat, lng) VALUES (?, ?, ?)",
          ["Tampere", 61.4978, 23.761],
          (err) => {
            if (err) return reject(err);
            resolve("Data inserted successfully");
          },
        );
      },
    );
  });
}

function findAll() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM locations", [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

module.exports = {
  initializeTable: initializeTable,
  findAll: findAll,
};
