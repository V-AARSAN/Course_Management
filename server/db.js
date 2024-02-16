const mysql = require('mysql');

const conn = mysql.createConnection({
  host: "localhost",
  user: "aarsan",
  password: "aarsaN@2002",
  database: "training_institute"
});

conn.connect(function(err) {
  if (err) {
    console.error('Error connecting to database:', err);
    throw err;
  }
  console.log("MySQL connected");
});

module.exports = { connection: conn };