const mongoose = require('mongoose');
const User = require('./model/user'); // adjust path as needed
const bcrypt = require('bcryptjs');

const createAdminUser = async () => {
  const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (existingAdmin) {
    console.log('Admin user already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  const adminUser = new User({
    username: 'admin',
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword,
    dateOfBirth: new Date('1990-01-01'),
    age: '34',
    gender: 'Other',
    bio: 'System admin account',
    role: 'admin'
  });

  await adminUser.save();
  console.log('Admin user created successfully.');
};

module.exports = createAdminUser;
