const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, UserRole } = require('../models/user.model');
const { config } = require('../../config/config');

class AuthService {
  async register(email, password, role = UserRole.VIEWER) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      role
    });

    return this.generateToken(user);
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    return this.generateToken(user);
  }

  generateToken(user) {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn
    });
  }
}

module.exports = new AuthService();