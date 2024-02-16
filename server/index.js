const express = require('express');
const App = require('./Router/Admin');
const { connection } = require('./db');
const cors = require('cors')
require('dotenv').config();

const app = express();
const port = process.env.PORT; // Corrected casing to PORT

app.use(cors({ origin: "http://localhost:5000" }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/admin", App);

app.listen(port, () => {
  console.log(`Your port ${port} is running successfully`);
});

