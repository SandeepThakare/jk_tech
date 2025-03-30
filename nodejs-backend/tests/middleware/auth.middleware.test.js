const { verifyToken } = require('../../src/middleware/auth.middleware');
const { generateTestToken } = require('../setup');

describe('Auth Middleware', () => {
  let mockReq;
  let mockRes;
  let nextFunction;

  beforeEach(() => {
    mockReq = {
      headers: {},
      user: null
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  it('should pass with valid token', async () => {
    const token = generateTestToken();
    mockReq.headers.authorization = `Bearer ${token}`;

    await verifyToken(mockReq, mockRes, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
    expect(mockReq.user).toBeDefined();
  });

  it('should fail without token', async () => {
    await verifyToken(mockReq, mockRes, nextFunction);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'No token provided'
    });
  });

  it('should fail with invalid token', async () => {
    mockReq.headers.authorization = 'Bearer invalid-token';

    await verifyToken(mockReq, mockRes, nextFunction);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Invalid token'
    });
  });
}); 