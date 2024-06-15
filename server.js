require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error('DB connection failed:', error));
db.once('open', () => console.log('Connected to the database'));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
      'project':'Products CRUD API',
      'description': 'CRUD API working on products resource, showcasing RESTful API development and other basics.'
    });
});

const productsRouter = require('./routes/products');
app.use('/api/products',productsRouter);

app.listen(3000, () => console.log('Dev server started on port 3000'));
