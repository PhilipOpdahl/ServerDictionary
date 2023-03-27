import express from 'express';
import * as pg from 'pg';
const { Client } = pg.default;
const { createHmac } = await import('node:crypto');
const userRoute = express.Router();

const db = process.env.DATABASE_URL || "postgres://mmogxwglkhfwih:28390813195248e339e653ea037ee32f117537fbcd353ac4d745517f28630be1@ec2-54-155-46-64.eu-west-1.compute.amazonaws.com:5432/de85303vmvhnl";
const credentials = {
    connectionString: db,
    ssl: {
        rejectUnauthorized: false
    }
};

userRoute.post('/login', async (req, res) => {
    const client = new Client(credentials);
    try {
        const hash = createHmac('sha256', req.body.password).digest('hex');
        await client.connect();

        const query = 'SELECT * FROM users WHERE usernames = $1 AND password = $2';
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

userRoute.post('/register', async (req, res) => {
    const client = new Client(credentials);
    let results = null;
    try {
        const hash = createHmac('sha256', req.body.password).digest('hex');
        await client.connect();

        const query = 'INSERT INTO users("usernames", "password") VALUES ($1, $2)';
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

export default userRoute;