const express = require('express');
const mysql = require('mysql');
const cors  = require('cors');

const app = express();
app.use(cors());
const PORT = 3001;

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hostel',
  password: 'NivedhBiju@020304',
  port: 5432,
});
// Middleware to parse JSON requests
app.use(express.json());

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.post("/api/login_student", async (req, res) => {
  const { id, passwd } = req.body;
  console.log(`Received login attempt - Username: ${id}, Password: ${passwd}`);

  try {
    const { rows } = await pool.query("SELECT passwd FROM Student WHERE roll_no = $1", [id]);
    console.log(rows);
    if (rows.length === 0) {
      console.log("User not found");
      res.json({ result: false });
    } else {
      const storedPassword = rows[0].passwd;
      
      if (storedPassword === passwd) {
        console.log("Login success");
        res.json({ result: true });
      } else {
        console.log("Incorrect password");
        res.json({ result: false });
      }
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/api/login_admin", async (req, res) => {
  const { id, passwd } = req.body;
  console.log(`Received login attempt - Username: ${id}, Password: ${passwd}`);

  try {
    const { rows } = await pool.query("SELECT passwd FROM Admin WHERE id = $1", [id]);
    console.log(rows);
    if (rows.length === 0) {
      console.log("User not found");
      res.json({ result: false });
    } else {
      const storedPassword = rows[0].passwd;
      
      if (storedPassword === passwd) {
        console.log("Login success");
        res.json({ result: true });
      } else {
        console.log("Incorrect password");
        res.json({ result: false });
      }
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/api/create_complaint", async (req, res) => {
  const { roll_no, date, type, description } = req.body;
  
  try {
    // Get the count of existing complaints
    const { rows: countResult } = await pool.query("SELECT COUNT(*) FROM Complaints");
    const count = parseInt(countResult[0].count) + 1; // Increment count by 1

    // Insert the new complaint into the database
    const query = {
      text: "INSERT INTO Complaints (roll_no, complaint_id, application_date, complaint_type, description) VALUES ($1, $2, $3, $4, $5)",
      values: [roll_no, count, date, type, description]
    };

    const { rows } = await pool.query(query);
    console.log("New complaint inserted:", rows);

    // Send response indicating success
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
