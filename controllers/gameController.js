import User from '../models/userModel.js';

export const spinWheel = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.wallet < 10) return res.status(400).json({ message: 'Insufficient balance' });

    // Deduct ₹10 for spin
    user.wallet -= 10;

    // Random reward logic
    const r = Math.random();
    let reward = 0;
    if (r < 0.5) reward = 0;
    else if (r < 0.75) reward = 5;
    else if (r < 0.95) reward = 10;
    else reward = 15;

    // Add reward to wallet
    user.wallet += reward;

    await user.save();

    res.json({
      message: 'Spin complete',
      reward,
      newBalance: user.wallet
    });
  } catch (err) {
    res.status(500).json({ message: 'Spin error' });
  }
};
