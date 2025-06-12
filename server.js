const express = require('express');
require('dotenv').config();
const sequelize = require('./db/connection');

const app = express();

// connect to the database
sequelize.authenticate()
    .then(() => {
        console.log('✅ PostgreSQL connected successfully.');
    })
    .catch((error) => {
        console.error('❌ Unable to connect to PostgreSQL:', error);
    });

// Middleware to parse JSON bodies
app.use(express.json());

// use Route


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send('About Us')
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});