const express = require('express');
const app = express();

require('dotenv').config;
const port = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes');
app.use(routes);

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
