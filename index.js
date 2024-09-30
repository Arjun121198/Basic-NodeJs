const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express();

// Use PORT from .env or default to 3000
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Connection error", err));

// Routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server and have it listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
