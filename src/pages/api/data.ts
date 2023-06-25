import fs from 'fs';
import Papa from 'papaparse';
import path from 'path';

export default function handler(req, res) {
  const csvFile = fs.readFileSync(path.resolve('./public/data/carbon_bombs_informations.csv'), 'utf-8');
  let parsedCSV = Papa.parse(csvFile, { header: true, dynamicTyping: true }).data;

  parsedCSV = parsedCSV
    .filter(item =>
      item.Latitude !== null &&
      item.Longitude !== null &&
      'Latitude' in item &&
      'Longitude' in item
    )
    .map(item => ({
      ...item,
      New_project_source_CB: item.New_project_source_CB === 'True',
    }));

  const data = { "bombs": parsedCSV }
  res.status(200).json(data);
}
