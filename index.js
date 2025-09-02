
// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import Razorpay from 'razorpay';
// import authRoutes from './routes/authRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';
// import gameRoutes from './routes/gameRoutes.js';
// import withdrawRoutes from './routes/withdrawRoutes.js';

// const app = express();
// dotenv.config();

// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('Mongo error:', err));

// app.use('/api/auth', authRoutes);
// app.use('/api/payment', paymentRoutes);
// app.use('/api/game', gameRoutes);
// app.use('/api/withdraw', withdrawRoutes);

// app.listen(process.env.PORT || 5000, () => {
//   console.log('Server running');
// });



import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Razorpay from 'razorpay';
import authRoutes from './routes/authRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import withdrawRoutes from './routes/withdrawRoutes.js';

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// ✅ Mongo connect + THEN server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    app.listen(process.env.PORT || 5000, () => {
      console.log('🚀 Server running');
    });
  })
  .catch(err => console.error('❌ Mongo error:', err));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/withdraw', withdrawRoutes);
