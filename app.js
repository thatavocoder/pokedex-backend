const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(errorHandler);