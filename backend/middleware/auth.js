import User from '../models/User.js';
import Admin from '../models/Admin.js';
import { verifyToken } from '../utils/jwt.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);

      if (!decoded) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
      }

      if (decoded.role === 'admin') {
        req.user = await Admin.findById(decoded.id).select('-password');
        req.userRole = 'admin';
      } else {
        req.user = await User.findById(decoded.id).select('-password');
        req.userRole = 'user';
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.userRole === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only' });
  }
};
