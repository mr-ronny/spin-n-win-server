
import Razorpay from 'razorpay';

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });



let razorpay;
try {
  const Razorpay = (await import('razorpay')).default;

  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret'
  });
} catch (err) {
  console.log("⚠️ Razorpay not initialized (dummy mode)");
  razorpay = null; // no real instance
}

export const createOrder = async (req, res) => {
  try {
    if (!razorpay) return res.json({ orderId: 'dummy_order_123' });

    const { amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id });
  } catch (err) {
    res.status(500).json({ message: 'Payment error' });
  }
};




// export const createOrder = async (req, res) => {
//   try {
//     const { amount } = req.body;
//     const options = {
//       amount: amount * 100,
//       currency: 'INR',
//       receipt: `receipt_order_${Date.now()}`
//     };
//     const order = await razorpay.orders.create(options);
//     res.json({ orderId: order.id });
//   } catch (err) {
//     res.status(500).json({ message: 'Payment error' });
//   }
// };










import crypto from 'crypto';
import User from '../models/userModel.js';

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, userId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                    .update(body)
                                    .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Payment signature mismatch' });
    }

    // Update user's wallet
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.wallet += amount;
    await user.save();

    res.json({ success: true, message: 'Payment verified & wallet updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error verifying payment' });
  }
};
