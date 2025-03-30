const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../../src/auth/models/user.model');
const AuthService = require('../../../src/auth/services/auth.service');
const { config } = require('../../../src/config/config');

describe('AuthService', () => {
  let authService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe('register', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      const user = await authService.register(userData);

      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.name).toBe(userData.name);
      expect(await bcrypt.compare(userData.password, user.password)).toBe(true);
    });

    it('should throw error if user already exists', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      await User.create(userData);

      await expect(authService.register(userData)).rejects.toThrow(
        'User already exists'
      );
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      await authService.register(userData);

      const result = await authService.login({
        email: userData.email,
        password: userData.password
      });

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.user.email).toBe(userData.email);
    });

    it('should throw error for invalid credentials', async () => {
      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('verifyToken', () => {
    it('should verify valid token', async () => {
      const userId = '123';
      const token = jwt.sign({ id: userId }, config.jwtSecret);

      const decoded = await authService.verifyToken(token);

      expect(decoded).toBeDefined();
      expect(decoded.id).toBe(userId);
    });

    it('should throw error for invalid token', async () => {
      await expect(
        authService.verifyToken('invalid-token')
      ).rejects.toThrow();
    });
  });
}); 