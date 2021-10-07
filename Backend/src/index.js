const mongoose = require('mongoose');
const routes = require('./routes');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const {
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST,
  PORT,
} = process.env;

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('MongoDB is Connected'))
  .catch((err) => console.log(`Error on connecting to MongoDB: ${err}`));

const app = express();
app.use(express.json());
app.use(routes);
app.use(cors());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;