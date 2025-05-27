require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // Allow requests from different origins (like your React app)// Parse incoming JSON bodies

// MySQL database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
  

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.post('/api/Signup', (req, res) =>{
  console.log("Received:", req.body);
  const {uname, pwd} = req.body;
  const sql = "insert into signup (uname, pwd) values (?,?)";
  db.query(sql, [uname, pwd], (err, result)=>{
    if (err) return res.status(500).send({message: "Database error", error: err});
    res.status(200).send({message: "user Register!"});
  });
});

app.post('/api/Login', (req,res)=>{
  const {username, password} = req.body;
  const sql = "select *  from signup where uname = ? and pwd = ? ";
  db.query(sql, [username, password], (err, result)=>{
    if (err) return res.status(500).send({message: "Database error", error: err});
    if(result.length > 0){
      res.send({message: "Login successful!"});
    } else {
      res.send({message:"wrong credentials"});
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
