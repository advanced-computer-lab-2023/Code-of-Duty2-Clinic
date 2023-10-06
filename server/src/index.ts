import connectToDB from './config/database';
import config from './config/config';
import express from 'express';

const app = express();
connectToDB()
app.get('/', (req, res) => {
    res.send('Server Online!');
});


app.listen(process.env.PORT, async () => {
    console.log(`Server listening on port ${config.server.port}`);
});
