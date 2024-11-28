const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'Priti@1108', // Your MySQL password
    database: 'her_cart_db1' // Your database name
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database!');
});

// Define a simple route
app.get('/', (req, res) => {
    
     res.send('Welcome to the From cart to Her Heart APP!');
});


app.get('/admin/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).send('Error retrieving user data');
        }
        res.json(results);
    });
});


//Route for user signup
app.post('/signup',(req, res) =>{
    const {name, email, contact, address, pincode, password} = req.body;

    //insert user data into mysql

    const query = 'INSERT INTO users (name, email, contact, address, pincode, password) VALUES(?,?,?,?,?,?)';
    db.query(query, [name, email, contact, address, pincode, password], (err, result)=>{
        if(err){
            console.log('Error inserting data:',err);
            return res.status(500).send('Error saving user');
        }
        res.send('User registered successfully!');
    });


});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
