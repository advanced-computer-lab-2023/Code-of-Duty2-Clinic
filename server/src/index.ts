import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Server Online!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
