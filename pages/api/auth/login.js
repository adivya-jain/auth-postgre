import { query } from "../../../lib/db";

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const loginQuery = 'SELECT * FROM users WHERE email = $1 AND password = $2';
      const loginResult = await query(loginQuery, [email, password]);

      if (loginResult.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      return res.status(200).json({ message: 'Login successful', user: loginResult.rows[0] });
    } catch (error) {
      console.error('Error logging in user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${method} not allowed` });
  }
}
