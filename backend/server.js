require('dotenv').config();
const express = require('express');
const app = express();
const connectdb = require('./database/db');
const cors = require('cors');

// Import routes
const authRoute = require('./route/auth-route');
const incomeRoute = require('./route/income');
const savingRoute = require('./route/saving');
const todoRoute = require('./route/todo');
const wishRoute = require('./route/wish');
const udharRoute = require('./route/udhar');
const investmentRoute = require('./route/investment');
const dashboardRoute = require('./route/dashbord-route');

// Middleware
app.use(express.json());

// =======================
// CORS (restrict in prod)
// =======================
const allowedOrigin = process.env.CLIENT_URL || 'https://piggypal-theta.vercel.app';

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.options('*', cors({ origin: allowedOrigin, credentials: true }));

// Database connection
connectdb();

// Routes
app.use('/api/auth', authRoute);
app.use('/api/income', incomeRoute);
app.use('/api/saving', savingRoute);
app.use('/api/todo', todoRoute);
app.use('/api/wish', wishRoute);
app.use('/api/udhar', udharRoute);
app.use('/api/investment', investmentRoute);
app.use('/api/dashboard', dashboardRoute);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
