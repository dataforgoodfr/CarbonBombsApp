import { createNeo4jSession } from '@/utils/neo4j';

export default async function handler(req, res) {
  const session = createNeo4jSession();
  const { query } = JSON.parse(req.body);

  try {
    const result = await session.run(query);
    const data = result.records.map((record) => record.toObject());

    res.status(200).json(data);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An error occurred during query execution' });
  } finally {
    // Close the session when done
    session.close();
  }
}
