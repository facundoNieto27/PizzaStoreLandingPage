require('dotenv').config();
const mongoose = require('mongoose');
const Message = require('./contact-form-backend/models/Message');

// Function to connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}

// Function to fetch and display all messages
async function getMessages() {
  try {
    // Fetch all messages, sorted by creation date (newest first)
    const messages = await Message.find().sort({ createdAt: -1 });
    
    if (messages.length === 0) {
      console.log('No messages found in the database.');
    } else {
      console.log(`Found ${messages.length} messages:`);
      
      messages.forEach((message, index) => {
        console.log(`\n--- Message ${index + 1} ---`);
        console.log(`Name: ${message.name}`);
        console.log(`Email: ${message.email}`);
        console.log(`Message: ${message.message}`);
        console.log(`Created at: ${message.createdAt}`);
      });
    }
  } catch (error) {
    console.error('Error fetching messages:', error.message);
  } finally {
    // Close the connection
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

// Execute the script
(async () => {
  await connectToDatabase();
  await getMessages();
})();

