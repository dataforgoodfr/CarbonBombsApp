import fs from 'fs';
import path from 'path';
import Papa, { parse } from 'papaparse';

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
    .map(item => {
      const companies = item.Parent_company_source_GEM.split(';').map(companyInfo => {
        const [company, percentage] = companyInfo.split('(');
        const ownershipShare = parseFloat(percentage);
        return {
          company: company.trim(),
          ownershipShare,
        };
      });

      return {
        ...item,
        Parent_company_source_GEM: companies,
        New_project_source_CB: item.New_project_source_CB === 'True',
      };
    });

  let companiesList = parsedCSV.flatMap(item => item.Parent_company_source_GEM);
  let uniqueCompanies = [...new Set(companiesList.map(company => company.company))];

  let countriesList = parsedCSV.map(item => item.Country_source_CB);
  let uniqueCountries = [...new Set(countriesList)];

  // Then add to your data object
  const data = { "bombs": parsedCSV, "companies": uniqueCompanies, "countries": uniqueCountries }

  res.status(200).json(data);
}
