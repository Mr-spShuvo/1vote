require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const router = require('./router');

// Database Connection
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Database 😍'));

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'x_SecretString_x', resave: false, saveUninitialized: true }));
app.use('/', router);

// Development Server
const PORT = process.env.PORT || 5000; //
app.listen(PORT, () => {
  console.log(`Application started on port: http://localhost:${PORT} 🔥`);
});
