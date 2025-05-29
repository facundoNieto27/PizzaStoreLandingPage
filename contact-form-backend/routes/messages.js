const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST - Create a new message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email and message' });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email' });
    }
    
    // Create new message
    const newMessage = new Message({
      name,
      email,
      message
    });
    
    // Save to database
    await newMessage.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Message received successfully!' 
    });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error, please try again later' 
    });
  }
});

// GET - Retrieve all messages (for admin purposes)
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;