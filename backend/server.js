const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const Product = require('./models/Products.js');
const app = express();
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.get('/api/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products' });
    }
  });
const PORT = process.env.PORT || 6100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
