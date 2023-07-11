import dotenv from 'dotenv';
import neo4j from 'neo4j-driver';

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
RETURN b.name as name, b.url_logo as url_logo, b.world_region, b.ceo_name as ceo_name, b.headquarters_address as address, b.headquarters_country as country,
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

export const companyFinancingQuery = (
  name
) => `MATCH (b:bank)-[f:FINANCES]->(c:company)
WHERE c.name = '${name}'
WITH b, c, f
RETURN c.name as name,
SUM(f.year_2017) as y2017FossilFinancing,
SUM(f.year_2018) as y2018FossilFinancing,
SUM(f.year_2019) as y2019FossilFinancing,
SUM(f.year_2020) as y2020FossilFinancing,
SUM(f.year_2021) as y2021FossilFinancing,
SUM(f.year_2022) as y2022FossilFinancing,
SUM(f.year_2022) / ((SUM(f.total) - SUM(f.year_2022))/6) - 1 AS var22VsPrev6y,
SUM(f.total) - SUM(f.year_2016) - SUM(f.year_2017) AS last5yFossilFinancing
ORDER BY last5yFossilFinancing DESC`;

export const companyDetailsQuery = (
  name
) => `MATCH (c:company)-[o:OPERATES]->(b:carbon_bomb)
WHERE c.name = '${name}'
RETURN c.name as name,
c.url_logo as url_logo,
c.country as country,
COUNT(1) AS nb_cBombs,
AVG(o.weight) AS avg_ownership_share,
SUM(b.potential_gtco2) AS tot_gtCO2_potential,
SUM(b.potential_gtco2 * o.weight/100) AS ownership_weighted_gtCO2_potential,
SUM(CASE WHEN b.new_project THEN 1 END) AS nb_new_cBombs,
SUM(CASE WHEN b.new_project THEN b.potential_gtco2 END) AS tot_gtCO2_potential_new_cBombs
ORDER BY SUM(b.potential_gtco2) DESC`;

export const companiesNameQuery = `MATCH (c:company) RETURN c.name as value, c.name as label`;

export const companyMainFuelTypeQuery = (
  name
) => `MATCH (c:company)-[:OPERATES]->(b:carbon_bomb)
WHERE c.name = '${name}'
RETURN c.name, b.fuel_type as main_fuel_type,
COUNT(b) AS nb_cBombs,
SUM(b.potential_gtco2) AS total_gtCO2_potential
ORDER BY c.name, total_gtCO2_potential DESC
LIMIT 1
`;

export const companyNetworkGraphQuery = (
  name
) => `MATCH path=(c:company)-[r1:OPERATES]->(p:carbon_bomb)
WHERE c.name = '${name}'
WITH COLLECT(DISTINCT nodes(path)) AS allNodes, COLLECT(DISTINCT relationships(path)) AS allRels
RETURN {nodes: allNodes, edges: allRels} as data`;
