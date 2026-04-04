require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Connection
connectDB();

// Routes
const reportRoutes = require('./routes/reports');
const authRoutes = require('./routes/auth'); // Adding even if not in original tree to support Core API

app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);

// Health Check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

app.listen(PORT, () => console.log(`🚀 JalSuraksha Backend running on port ${PORT}`));
