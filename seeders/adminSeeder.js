const mongoose = require('mongoose');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

const seedAdmins = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/crudDB');

    const hashedPassword = await bcrypt.hash('12345678', 10); 

    const admin = await Admin.findOneAndUpdate(
      { email: 'admin@mailinator.com' }, 
      { password: hashedPassword },       
      { new: true, upsert: true }
    );

    console.log(admin ? 'Admin updated successfully!' : 'Admin created successfully!');
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await mongoose.connection.close(); // Ensure the connection is closed
  }
};

seedAdmins();
