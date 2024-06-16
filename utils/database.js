const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL);
    const db = mongoose.connection;
    db.on('error', (error) => console.error('DB connection failed:', error));
    db.once('open', () => console.log('Connected to the database'));
    return db;
}

module.exports = connectDatabase; 