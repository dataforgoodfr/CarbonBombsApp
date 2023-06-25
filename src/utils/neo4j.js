import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

export function createNeo4jSession() {
  const { NEO4J_HOST, NEO4J_PORT, NEO4J_USER, NEO4J_PASSWORD } = process.env;
  const uri = `${NEO4J_HOST}:${NEO4J_PORT}`;

  const driver = neo4j.driver(
    uri,
    neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
  );
  const session = driver.session();

  return session;
}
