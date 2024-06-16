require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const { authenticateRequest } = require('./middlewares/auth');
const authRoutes = require('./routes/auth');
const productsRouter = require('./routes/products');

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', (error) => console.error('DB connection failed:', error));
db.once('open', () => console.log('Connected to the database'));

app.use(express.json());

app.get('/', (request, response) => {
    response.json({
      'project':'Products CRUD API',
      'description': 'CRUD API working on products resource, showcasing RESTful API development and other basics.'
    });
});

app.use('/api', authRoutes);

// Protected route
app.get('/api/protected', authenticateRequest, (request, response) => {
  response.status(200).json({ message: 'You have accessed a protected route' });
});

app.use('/api/products', productsRouter);

app.listen(3000, () => console.log('Dev server started on port 3000'));
