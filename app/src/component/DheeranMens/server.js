const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow requests from your React frontend
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "12112003", // Replace with your MySQL password
  database: "hostel",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

// API Endpoint to Fetch Data
app.get("/students", (req, res) => {
  const query = "SELECT id as key, id as sno, name, roll_no as rollnumber, mobile, parent_mobile as parentmobile, email, CONCAT(year, ' Year') as year FROM students";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching data from database");
    } else {
      res.json(results);
    }
  });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
