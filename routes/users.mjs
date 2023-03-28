import express from 'express';
import * as pg from 'pg';
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

const asyncHandler = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

userRoute.post('/login', asyncHandler(async (req, res) => {
    const client = new Client(credentials);
    const hash = createHmac('sha256', req.body.password).digest('hex');

    await client.connect();

    const query = 'SELECT * FROM users WHERE usernames = $1 AND password = $2';
    const values = [req.body.username, hash];
    const result = await client.query(query, values);

    await client.end();

    if (result.rowCount > 0) {
        res.send({ id: result.rows[0].id, "Login": "OK!" });
    } else {
        res.status(401).send({ "Error": "Invalid username or password" });
    }
}));

userRoute.post('/register', asyncHandler(async (req, res) => {
    const client = new Client(credentials);
    const hash = createHmac('sha256', req.body.password).digest('hex');

    await client.connect();

    const query = 'INSERT INTO users("usernames", "password") VALUES ($1, $2)';
    const values = [req.body.username, hash];
    const results = await client.query(query, values);

    await client.end();

    if (results.rowCount > 0) {
        res.send({ "Registration": "OK!" });
    } else {
        res.status(400).send({ "Error": "Failed to register user" });
    }
}));

export default userRoute;
