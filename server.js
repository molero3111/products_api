require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const productsRouter = require('./routes/products');
const connectDatabase = require('./utils/database');

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

connectDatabase();

app.use(express.json());

app.get('/', (request, response) => {
    response.json({
      'project':'Products CRUD API',
      'description': 'CRUD API working on products resource, showcasing RESTful API development and other basics.'
    });
});

app.use('/api', authRoutes);
app.use('/api/products', productsRouter);

app.listen(3000, () => console.log('Dev server started on port 3000'));
