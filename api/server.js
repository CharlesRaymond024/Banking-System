const express = require('express');
require('dotenv').config();
const sequelize = require('./db/connection');
const {Bank,
    User,
    Account,
    Card,
    Transaction,
    Notification,
    JointAccount,
    UserJointAccount
} = require('./models/association'); // Adjust the path as necessary
const bankRoutes = require('./routes/bankRoute'); // Import your bank routes
const userRoutes = require('./routes/userRoute'); // Import your user routes
const accountRoutes = require('./routes/accountRoute'); // Import your account routes
const cardRoutes = require('./routes/cardRoute'); // Import your card routes
const transactionRoutes = require('./routes/transactionRoute'); // Import your transaction routes
const notificationRoutes = require('./routes/notificationRoute'); // Import your notification routes
const jointAccountRoutes = require('./routes/jointAccountRoute')
const authRoute = require('./routes/authRoute'); // Import your auth routes
const cookieParser = require('cookie-parser')

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

app.use(cookieParser())

// use Route
app.use('/api/v1/bank', bankRoutes); // Use the bank routes
app.use('/api/v1/user', userRoutes); // Use the user routes
app.use('/api/v1/account', accountRoutes); // Use the account routes
app.use('/api/v1/card', cardRoutes); // Use the card routes
app.use('/api/v1/transaction', transactionRoutes); // Use the transaction routes
app.use('/api/v1/notification', notificationRoutes); // Use the notification routes
app.use('/api/v1/jointAccount', jointAccountRoutes)
app.use('/api/v1/auth', authRoute); // Use the auth routes


sequelize.sync({ alter: true }) // Use alter: true in development to update the schema
.then(() => {
    console.log('✅ Table synchronized successfully.');
}) .catch((error) => {
    console.error('❌ Error synchronizing table:', error);
});

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