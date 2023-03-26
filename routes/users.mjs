import express from 'express'

const userRoute = express.Router();
let users = [];

userRoute.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = users.find(user => user.username === username);
  
    if (foundUser && foundUser.password === password) {
      res.status(200).send({ message: 'Logged in successfully' });
    } else {
      res.status(401).send({ message: 'Invalid username or password' });
    }
  });  

userRoute.post('/register', async (req, res) => {
    const newUser = {
      username: req.body.username,
      password: req.body.password,
    };
  
    users.push(newUser);
    res.send(users);
  });


export default userRoute;

/*import express from 'express'
import * as pg from 'pg'
const { Client } = pg.default;
const { createHmac } = await import('node:crypto');
const userRoute = express.Router();

const db = process.env.DATABASE_URL;
const credentials = {
    connectionString: db,
    ssl: {
        rejectUnauthorized: false
    }
};

userRoute.post('/register', async (req, res) => {
    console.log('Register request body:', req.body);
    const client = new Client(credentials);
    let results = null;
    try {
        const hash = createHmac('sha256', req.body.password).digest('hex');
        await client.connect();

        const query = 'INSERT INTO users("username", "password") VALUES ($1, $2)';
        const values = [req.body.username, hash];
        results = await client.query(query, values);

        if (results.rowCount > 0) {
            res.send({ "Registration": "OK!" });
        } else {
            res.status(400).send({ "Error" : "Failed to register user"});
        }

    } catch (error) {
        console.error('Error in /register:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.end();
    }
});

userRoute.post('/login', async (req, res) => {
    console.log('Login request body:', req.body);
    const client = new Client(credentials);
    try {
        const hash = createHmac('sha256', req.body.password).digest('hex');
        await client.connect();

        const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
        const values = [req.body.username, hash];
        const result = await client.query(query, values);

        if (result.rowCount > 0) {
            res.send({ id: result.rows[0].id, "Login": "OK!" });
        } else {
            res.status(401).send({ "Error": "Invalid username or password" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.end();
    }
});

export default userRoute; */