const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('Uncaught Exception! Shuting down...');
    process.exit(1);
});

dotenv.config({
    path: './config.env',
});

const DB = process.env.DATABASE.replace(
    '<db_password>',
    process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => {
    console.log('DB connection Success');
});

const app = require('./app');

const port = process.env.PORT || 3000;
const host = '127.0.0.1';

const server = app.listen(port, host, () => {
    console.log(`express app running on http://${host}:${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('Unhandled Rejection! Shuting down...');
    server.close(() => {
        process.exit(1);
    });
});
