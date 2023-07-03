import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

export function createNeo4jSession() {
  const { NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD } = process.env;

  const driver = neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
  );
  const session = driver.session();

  return session;
}

export const bankDetailsQuery = (
  name
) => `MATCH (b:bank)-[f:FINANCES]->(c:company)
WHERE b.name = '${name}'
WITH b, c, f
RETURN b.name as name, b.world_region, b.ceo_name as ceo_name, b.headquarters_address as address, b.headquarters_country as country,
COUNT(DISTINCT c.name) AS FF_companies_financed,
SUM(f.year_2016) as y2016FossilFinancing,
SUM(f.year_2017) as y2017FossilFinancing,
SUM(f.year_2018) as y2018FossilFinancing,
SUM(f.year_2019) as y2019FossilFinancing,
SUM(f.year_2020) as y2020FossilFinancing,
SUM(f.year_2021) as y2021FossilFinancing,
SUM(f.year_2022) as y2022FossilFinancing,
SUM(f.year_2022) / ((SUM(f.total) - SUM(f.year_2022))/6) - 1 AS var22VsPrev6y,
SUM(f.total) AS totalFossilFinancing,
SUM(f.total) - SUM(f.year_2016) - SUM(f.year_2017) AS last5yFossilFinancing
ORDER BY totalFossilFinancing DESC;`;

export const banksNameQuery = `MATCH (b:bank)-[f:FINANCES]->(c:company)
  WITH b, c, f
  RETURN b.name as value, b.name as label,
  COUNT(DISTINCT c.name) AS FF_companies_financed;`;
