const bcrypt = require('bcryptjs');
const User = require('../models/User');
const connectDatabase = require('../utils/database');

// Connect to MongoDB
databaseConnection = connectDatabase();

// Function to create a new user
const createUser = async (username, email, password, role) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            return;
        }
        const newUser = new User({
            username,
            email,
            password: password,
            role: role || 1 // Default to role 1 if not specified
        });

        await newUser.save();
        console.log(`User ${username} created successfully`);
    } catch (error) {
        console.error('Error creating user:', error.message);
    } finally {
        databaseConnection.close(); // Close connection after operation
    }
};

// Retrieve arguments from command line
const [username, email, password, role] = process.argv.slice(2);

if (!username || !email || !password) {
    console.log('Usage: node scripts/createUser.js <username> <email> <password> <role>');
    process.exit(1);
}

createUser(username, email, password, role);