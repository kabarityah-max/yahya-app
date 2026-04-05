const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { sendWelcomeEmail } = require('../services/emailService');

const prisma = new PrismaClient();

async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, currencyPreference: true },
    });
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password required' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: 'EMPLOYEE',
        currencyPreference: 'JOD',
      },
      select: { id: true, name: true, email: true, role: true },
    });

    // Send welcome email to the newly created user (non-blocking)
    const emailResult = await sendWelcomeEmail(user, password);

    // Update email tracking in database
    if (emailResult.success) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailSent: true, emailSentAt: new Date() },
      });
    }

    res.json({
      user,
      message: 'User created successfully',
      emailSent: emailResult.success,
      emailError: emailResult.error || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = parseInt(req.params.id, 10);
    const currentUserId = req.user.id;

    if (userId === currentUserId) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    await prisma.user.delete({ where: { id: userId } });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete user error:', err.message);
    res.status(500).json({ error: err.message || 'Server error' });
  }
}

module.exports = { getAllUsers, createUser, deleteUser };
