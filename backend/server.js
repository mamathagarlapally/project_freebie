require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const upload = multer(); 
const app = express();
const PORT = 5000;
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));



const SECRET_KEY = process.env.JWT_SECRET

// ✅ MySQL connection pool (no manual connect needed)
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.post('/api/Signup', async (req, res) => {
  const { uname, pwd } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM signup WHERE uname = ?', [uname]);

    if (rows.length > 0) {
      console.log("Username already exists:", uname);
      return res.status(400).json({ message: 'Username already exists. Please choose another.' });
    }

    await db.query('INSERT INTO signup (uname, pwd) VALUES (?, ?)', [uname, pwd]);
    try {
    await db.query('INSERT INTO user_info (username, password) VALUES (?, ?)', [uname, pwd]);
  } catch (err) {
    console.error('Error inserting into user_info:', err);
  }
    res.status(201).json({ message: 'Signup successful!' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/Login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM signup WHERE uname = ? AND pwd = ?",
      [username, password]
    );

    if (rows.length > 0) {
      const token = jwt.sign({ username: rows[0].uname }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ message: "Login successful!", token });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (err) {
    res.status(500).send({ message: "Database error", error: err });
  }
});

app.post('/api/Modal', upload.single('photo') , async(req, res) =>{
  const {
    item_id,
    option_val,
    description,
    contact_no,
    like_count,
    uname
  } = req.body;

  const photo = req.file?.buffer; // This is your image binary

  try {
    await db.query(
      'INSERT INTO uploaded_items (item_id, option_val, description, contact_no, like_count, uname, photo) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [item_id, option_val, description, contact_no, like_count, uname, photo]
    );
    await db.query('update user_info set cont_no = ? where username = ?',[contact_no, uname]);
    res.status(201).json({ message: 'Item saved successfully!' });
  } catch (err) {
    console.error('Error saving item:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/addingdraft', upload.single('photo') , async(req, res) =>{
  const {
    item_id,
    option_val,
    description,
    contact_no,
    uname
  } = req.body;

  const photo = req.file?.buffer; // This is your image binary

  try {
    await db.query(
      'INSERT INTO drafted_items (item_id, option_val, description, contact_no, uname, photo) VALUES (?, ?, ?, ?, ?, ?)',
      [item_id, option_val, description, contact_no, uname, photo]
    );

    res.status(201).json({ message: 'Item saved successfully!' });
  } catch (err) {
    console.error('Error saving item:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/myitems', verifyToken, async(req, res)=>{
  try{
    const [items] = await db.query('select * from uploaded_items where uname = ? ', [req.user.username]);
    res.json(items);
  } catch (err) {
    console.error("❌ Error in /api/myitems:", err);
     res.status(500).json({message: 'error in fetching items', error:err});
  }
});

app.get('/api/likeditems', verifyToken, async(req, res)=>{
  try{
    const [items] = await db.query('select * from liked_items where uname = ? ', [req.user.username]);
    res.json(items);
  } catch (err) {
     res.status(500).json({message: 'error in fetching items', error:err});
  }
});

app.get('/api/draftitems', verifyToken, async(req, res)=>{
  try{
    const [items] = await db.query('select * from drafted_items where uname = ?', [req.user.username]);
    res.json(items);
  } catch(err){
    res.status(500).json({message: 'error in fetching items', error:err});
  }
});

app.get('/api/image/:item_id', async (req, res) => {
  try {
    const item_Id = req.params.item_id;
    const [rows] = await db.query('SELECT photo FROM uploaded_items WHERE item_id = ?', [item_Id]);
    if (rows.length === 0) return res.status(404).send('Image not found');

    const img = rows[0].photo;
    res.setHeader('Content-Type', 'image/jpeg'); // change to image/png if needed
    res.send(img);
  } catch (err) {
    console.error('Error fetching image:', err);
    res.status(500).send('Error fetching image');
  }
});

app.get('/api/images/:item_id', async (req, res) => {
  try {
    const item_Id = req.params.item_id;
    const [rows] = await db.query('SELECT photo FROM drafted_items WHERE item_id = ?', [item_Id]);
    if (rows.length === 0) return res.status(404).send('Image not found');

    const img = rows[0].photo;
    res.setHeader('Content-Type', 'image/jpeg'); // change to image/png if needed
    res.send(img);
  } catch (err) {
    console.error('Error fetching image:', err);
    res.status(500).send('Error fetching image');
  }
});

app.get('/api/imagesliked/:item_id', async (req, res) => {
  try {
    const item_Id = req.params.item_id;
    const [rows] = await db.query('SELECT photo FROM liked_items WHERE item_id = ?', [item_Id]);
    if (rows.length === 0) return res.status(404).send('Image not found');

    const img = rows[0].photo;
    res.setHeader('Content-Type', 'image/jpeg'); // change to image/png if needed
    res.send(img);
  } catch (err) {
    console.error('Error fetching image:', err);
    res.status(500).send('Error fetching image');
  }
});


app.get('/api/publicItems', async(req, res)=>{
  try{
    const [items] = await db.query('select * from uploaded_items where hidden = 0');
    res.json(items);
  } catch(err){
    res.status(500).json({message: 'error in fetching items', error:err});
  }
});

app.post('/api/handlehide', async (req, res) => {
  const { id, hidden } = req.body;
  try {
    await db.query('UPDATE uploaded_items SET hidden = ? WHERE item_id = ?', [hidden, id]);
    res.json({ message: 'Hidden status updated' });
  } catch (err) {
    res.status(500).json({ message: 'error', error: err });
  }
});

app.post('/api/handledeleteupload', async(req, res) =>{
   const{id} = req.body;
   try{
    await db.query('delete from uploaded_items where item_id = ?', [id]);
    res.json({message: 'item deleted successfully'});
   } catch(err){
    res.status(500).json({message: "item deletion failed", error:err});
   }
});

app.post('/api/updatelike', async(req, res)=>{
  const{id} = req.body;
  try{
    await db.query('update uploaded_items set like_count = like_count +1 where item_id = ?', [id]);
    res.json({message: 'successfully handled likes'});
  } catch(err){
     res.status(500).json({message: "Like updation failed", error:err});
  }
});

app.post('/api/draftdelete', async(req, res)=>{
  const {id} = req.body;
  if (!id){
    return res.status(400).json({error: 'It is requires'});
  }
  try{
    await db.query('delete from drafted_items where item_id =?', [id]);
    res.json({message:"Successfully deleted drafted items"});
  } catch(err){
      res.status(500).json({message: "item deletion failed", error:err});
  }
});

app.post('/api/uploaddraft', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  let connection;
  try {
    connection = await db.getConnection();  // get a connection from the pool
    await connection.beginTransaction();

    const insertQuery = `
      INSERT INTO uploaded_items (item_id, uname, option_val, description, contact_no,photo) 
      SELECT item_id,uname,option_val,description,contact_no, photo FROM drafted_items WHERE item_id = ?
    `;
    const [insertResult] = await connection.execute(insertQuery, [id]);

    if (insertResult.affectedRows === 0) {
      throw new Error('No row found with the given ID');
    }

    const deleteQuery = `DELETE FROM drafted_items WHERE item_id = ?`;
    await connection.execute(deleteQuery, [id]);

    await connection.commit();
    res.status(200).json({ message: `Row with id ${id} moved successfully.` });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) connection.release();  // release connection back to pool
  }
});

app.post('/api/storeliked', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  let connection;
  try {
    connection = await db.getConnection();  // get a connection from the pool
    await connection.beginTransaction();

    const insertQuery = `
      INSERT INTO liked_items (item_id, uname, option_val, description, contact_no,like_count,photo) 
      SELECT item_id,uname,option_val,description,contact_no,like_count, photo FROM uploaded_items WHERE item_id = ?
    `;
    const [insertResult] = await connection.execute(insertQuery, [id]);

    if (insertResult.affectedRows === 0) {
      throw new Error('No row found with the given ID');
    }

    await connection.commit();
    res.status(200).json({ message: `Row with id ${id} moved successfully.` });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) connection.release();  // release connection back to pool
  }
});

app.post('/api/adduserdetails', async(req,res)=>{
  const {username, photo} = req.body;
  try{
   await db.query('insert into user_info (username, photo) values (?,?)',[username, photo]);
  } catch(err){
    res.status(500).json({message: "user details addition failed", error:err});
  }
})

app.post('/api/oldpwdmatch', async(req,res)=>{
  const {username, oldpwd} = req.body;
  try{
    const [rows] = await db.query('select password from user_info where username = ?',[username]);
    if (rows.length > 0) {
      if (rows[0].password === oldpwd){
     res.send({message:'username and old password matched'});
    }
    else{
      res.send({message:'incorrect password'});
    }
    }
    
  }catch(err){
    console.error(err);
  }
});

app.post('/api/addnewpwd', async(req,res)=>{
  const {username, newpwd} = req.body;
  try{
    await db.query('update user_info set password = ? where username =?',[newpwd, username]); 
    await db.query('update signup set pwd = ? where uname = ?', [newpwd, username]);
  }
  catch(err){
    console.error(err);
  }
});

app.post('/api/addemail', async(req, res)=>{
  const {username, emailid} = req.body;
  try{
    await db.query('update user_info set mailid = ? where username = ?', [emailid,username]);
  } catch(err){
    console.error(err);
  }
})

app.post('/api/uploadprofilepic',upload.single('photo'), async(req,res)=>{
  const {username} = req.body;
  const photo = req.file?.buffer;
  try{
    await db.query('update user_info set photo = ? where username = ?',[photo, username]);
  res.status(201).json({ message: 'Item saved successfully!' });
  } catch (err) {
    console.error('Error saving item:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/imaging/:uname', async (req, res) => {
  try {
    const item_Id = req.params.uname;
    const [rows] = await db.query('SELECT photo FROM user_info WHERE username = ?', [item_Id]);
    if (rows.length === 0) return res.status(404).send('Image not found');

    res.setHeader('Content-Type', rows[0].photo_type || 'image/jpeg');
    res.send(rows[0].photo);
  } catch (err) {
    console.error('Error fetching image:', err);
    res.status(500).send('Error fetching image');
  }
});

app.get('/fetchemail', async(req, res)=>{
  const {username} = req.query;
  try {
    const [rows] = await db.query(
      'SELECT mailid FROM user_info WHERE username = ?',
      [username]
    );
    if (rows.length > 0) {
      res.json(rows[0].mailid);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/fetchcontact', async(req, res)=>{
  const {username} = req.query;
  try {
    const [rows] = await db.query(
      `select distinct contact_no from uploaded_items where uname = ? and contact_no <> '' and contact_no is not null`,
      [username]
    );
    if (rows.length > 0) {
      res.json(rows[0].contact_no);
      console.log("server testing email:", rows[0].contact_no);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/profile", verifyToken, (req, res) => {
  const username = req.user.username;  
    res.json({username });
});

app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you're authenticated!` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
