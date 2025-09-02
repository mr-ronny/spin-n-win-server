// server/controllers/withdrawController.js
import Withdraw from '../models/withdrawModel.js';
import User from '../models/userModel.js';

export const requestWithdraw = async (req, res) => {
  try {
    const { userId, amount, upiId } = req.body;

    const user = await User.findById(userId);
    if (!user || user.wallet < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // deduct from wallet
    user.wallet -= amount;
    await user.save();

    const withdraw = new Withdraw({ userId, amount, upiId });
    await withdraw.save();

    res.status(200).json({ message: 'Withdraw request submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Withdraw error' });
  }
};

export const getAllWithdraws = async (req, res) => {
  try {
    const data = await Withdraw.find().populate('userId', 'email');
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Get withdraws failed' });
  }
};

export const updateWithdrawStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const withdraw = await Withdraw.findById(id);
    if (!withdraw) return res.status(404).json({ message: 'Withdraw not found' });

    withdraw.status = status;
    await withdraw.save();

    res.json({ message: `Withdraw ${status}` });
  } catch (err) {
    res.status(500).json({ message: 'Update status error' });
  }
};
