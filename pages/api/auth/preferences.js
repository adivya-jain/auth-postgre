import { query } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { id } = req.query; 
      if (!id) {
        return res.status(400).json({ message: "User ID is required." });
      }
      const result = await query(
        "SELECT preferences FROM users WHERE id = $1",
        [id] 
      );
      const preferences = result.rows[0]?.preferences || [];
      res.status(200).json({ preferences });
    } catch (error) {
      console.error("Error fetching preferences:", error);
      res.status(500).json({ message: "Failed to fetch preferences." });
    }
  } else if (req.method === "POST") {
    try {
      const { id, preferences } = req.body;

      if (!Array.isArray(preferences)) {
        return res.status(400).json({ message: "Invalid data format." });
      }

      await query(
        "UPDATE users SET preferences = $1 WHERE id = $2",
        [preferences, id]
      );
      res.status(200).json({ message: "Preferences saved successfully." });
    } catch (error) {
      console.error("Error saving preferences:", error);
      res.status(500).json({ message: "Failed to save preferences." });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
}
