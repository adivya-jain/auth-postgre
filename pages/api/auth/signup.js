import { query } from "../../../lib/db";


export default async function handler(req, res) {
  const { method } = req;

  try {
    const testConnection = await query('SELECT 1');
    console.log("PostgreSQL connected successfully:", testConnection.rows);
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    return res.status(500).json({ message: 'Failed to connect to the database' });
  }

  if (method === 'POST') {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const userCheckQuery = 'SELECT * FROM users WHERE email = $1';
      const userCheckResult = await query(userCheckQuery, [email]);

      if (userCheckResult.rows.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const insertUserQuery = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
      const newUser = await query(insertUserQuery, [name, email, password]);

      return res.status(201).json({ message: 'User created successfully', user: newUser.rows[0] });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${method} not allowed` });
  }
}
