const Waitlist = require('../model/waitlistModel');

exports.joinWaitlist = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Email is required' });
  }

  try {
    const existingEntry = await Waitlist.findOne({
      email: email.toLowerCase(),
    });
    if (existingEntry) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email already exists in the waitlist',
      });
    }

    const newEntry = new Waitlist({ email: email.toLowerCase() });
    await newEntry.save();
    return res.status(201).json({
      status: 'success',
      message: 'Successfully joined the waitlist',
    });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.ping = (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is alive' });
};
