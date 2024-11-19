const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

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

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data loaded successfully');
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
};

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('deleted all the documents');
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
};

if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();
else process.exit();
