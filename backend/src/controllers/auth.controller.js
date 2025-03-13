import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

export class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const user = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (user.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // TODO: Add proper password comparison here
      
      const token = jwt.sign(
        { id: user.rows[0].id, email: user.rows[0].email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  }

  async register(req, res) {
    try {
      const { email, password, fullName } = req.body;

      // TODO: Add password hashing here
      
      const result = await pool.query(
        'INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name',
        [email, password, fullName]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ error: 'Registration failed' });
    }
  }

  async logout(req, res) {
    // Since we're using JWT, we don't need to do anything server-side
    // The client should remove the token
    res.json({ message: 'Logged out successfully' });
  }

  async refreshToken(req, res) {
    try {
      const { token } = req.body;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const newToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ token: newToken });
    } catch (error) {
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  }
}