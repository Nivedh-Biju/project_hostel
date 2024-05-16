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
  password: 'PostgreSQL',
  port: 5432,
});
// Middleware to parse JSON requests
app.use(express.json());

// Define a route
app.get('/api/complaints', async (req, res) => {
  const { user, date, type } = req.query;
  console.log(req.query);
  try {
    let query = "SELECT * FROM Complaints WHERE roll_no = $1";
    let params = [user.id];

    // Add date filter if provided
    if (date != '') {
      query += " AND application_date = $2";
      params.push(date);
    }

    // Add type filter if provided
    if ((type != '') && (date != '')) {
      query += " AND complaint_type = $3";
      params.push(type);
    }
    else if(type != ''){
      query += " AND complaint_type = $2";
      params.push(type); 
    }
    console.log(query);
    const { rows: complaints } = await pool.query(query, params);
    console.log(complaints);
    res.json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/complaints_admin', async (req, res) => {
  const { date, type, roll_no, resolved } = req.query;
  console.log(req.query);
  try {
    let query = "SELECT * FROM Complaints WHERE complaint_id IS NOT NULL";
    let params = [];
    let paramIndex = 1; // To keep track of parameter indices

    if (date !='') {
        query += ` AND application_date = $${paramIndex}`;
        params.push(date);
        paramIndex++;
    }

    if (type!='') {
        query += ` AND complaint_type = $${paramIndex}`;
        params.push(type);
        paramIndex++;
    }

    if (roll_no!='') {
        query += ` AND roll_no LIKE $${paramIndex}`;
        params.push(`%${roll_no}%`);
        paramIndex++;
    }

    if (resolved!='') {
        if (resolved === 'true') {
            query += " AND resolve_date IS NOT NULL";
        } else {
            query += " AND resolve_date IS NULL";
        }
    }

    const { rows: complaints } = await pool.query(query, params);
    res.json(complaints);
} catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}

});


app.get('/api/guest_room_requests_admin', async (req, res) => {
  const {occupant_name, phone_no, start_date, end_date, type, status, request_date} = req.query;
  console.log(req.query);
  try {
    let query = "SELECT * "
                + "FROM guest_house_request r"
                + "WHERE occupant_name IS NOT NULL";
    let params = [];
    let paramIndex = 1; // To keep track of parameter indices
    
    if (occupant_name!='') {
        query += ` AND occupant_name LIKE $${paramIndex}`;
        params.push(`%${occupant_name}%`);
        paramIndex++;
    }
    
    if (phone_no!='') {
        query += ` AND phone_no LIKE $${paramIndex}`;
        params.push(`%${phone_no}%`);
        paramIndex++;
    }

    if (start_date !='') {
        query += ` AND start_date = $${paramIndex}`;
        params.push(start_date);
        paramIndex++;
    }

    if (type!='') {
        query += ` AND type = $${paramIndex}`;
        params.push(type);
        paramIndex++;
    }

    if (status!='') {
        query += ` AND status = $${paramIndex}`;
        params.push(status);
        paramIndex++;
    }

    query += ` ORDER BY request_date DESC`
    const { rows: guest_room_requests } = await pool.query(query, params);
    res.json(guest_room_requests);
} catch (error) {
    console.error('Error fetching guest_room_requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}

});


app.put('/api/complaints_admin_resolve', async (req, res) => {
  const { complaint_id, user } = req.body;

  if (!complaint_id || !user) {
      return res.status(400).send('Complaint ID and user ID are required');
  }

  try {
      const result = await pool.query(
          'UPDATE Complaints SET resolve_date = NOW() WHERE complaint_id = $1',
          [complaint_id]
      );

      if (result.rowCount === 0) {
          return res.status(404).send('Complaint not found');
      }

      res.send('Complaint marked as resolved');
  } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Server error');
  }
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


app.post("/api/create_guest_request", async (req, res) => {
  const { roll_no, request_date, type, occupant_name, phone_no, start_date, end_date } = req.body;

  try {
    // Check room availability
    const query = {
      text: `
        SELECT Guest_rooms.guest_room
        FROM Guest_rooms
        LEFT JOIN Allotted_guest_house ON Guest_rooms.guest_room = Allotted_guest_house.guest_room
        WHERE (Allotted_guest_house.start_date IS NULL OR Allotted_guest_house.end_date < $1 OR Allotted_guest_house.start_date > $2)
        AND type = $3;
      `,
      values: [start_date, end_date, type]
    };

    const { rows } = await pool.query(query);

    // If no rooms are available, return 'room unavailable' response
    if (rows.length === 0) {
      return res.status(400).json({ error: 'Room unavailable for selected type and dates' });
    }

    // Insert the guest house request into the database
    const insertQuery = {
      text: `
        INSERT INTO Guest_house_request (occupant_name, phone_no, start_date, end_date, type, status, request_date) 
        VALUES ($1, $2, $3, $4, $5, 'pending', $6)
      `,
      values: [occupant_name, phone_no, start_date, end_date, type, request_date]
    };

    await pool.query(insertQuery);

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
