import { createNeo4jSession } from '@/utils/neo4j';

export default async function handler(req, res) {
  const session = createNeo4jSession();
  const { entity } = req.query;

  const query = `MATCH (n:${entity}) RETURN n, SIZE([(n)--() | n]) AS RelationshipCount ORDER BY RelationshipCount DESC`;
  try {
    const result = await session.run(query);
    const data = result.records.map((record) => record.get('n').properties);

    res.status(200).json(data);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'An error occurred during query execution' });
  } finally {
    // Close the session when done
    session.close();
  }
}
