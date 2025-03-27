const express = require('express');
const cors = require('cors');
const connectDB = require('./database/db');
const errorHandler = require('./middleware/errorhandler');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');


require('dotenv').config();


connectDB();

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
