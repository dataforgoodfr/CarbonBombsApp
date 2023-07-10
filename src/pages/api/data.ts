import fs from 'fs';
import Papa from 'papaparse';
import path from 'path';

interface CompanyInfo {
  company: string;
  ownershipShare: number;
}

interface ParsedItem {
  Latitude: number | null;
  Longitude: number | null;
  Parent_company_source_GEM: string;
  New_project_source_CB: boolean | string;
  Country_source_CB?: string; // Add this
  [key: string]: any; // to allow other properties
}

interface ParsedItemModified {
  Latitude: number | null;
  Longitude: number | null;
  Parent_company_source_GEM: CompanyInfo[];
  New_project_source_CB: boolean | string;
  [key: string]: any; // to allow other properties
}

export default function handler(req, res) {
  const csvFile = fs.readFileSync(path.resolve('./public/data/carbon_bombs_informations.csv'), 'utf-8');
  // let parsedCSV = Papa.parse(csvFile, { header: true, dynamicTyping: true }).data;
  const parsedCSV: ParsedItem[] = Papa.parse(csvFile, { header: true, dynamicTyping: true }).data as ParsedItem[];


  const parsedCSVModified = parsedCSV
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

  const companiesList = parsedCSVModified.flatMap(item => item.Parent_company_source_GEM.map(company => company.company));
  // const companiesList = parsedCSV.flatMap(item => item.Parent_company_source_GEM);
  const uniqueCompanies = Array.from(new Set(companiesList));
  // const uniqueCompanies = Array.from(new Set(companiesList.map(company => company.company)));
  // const uniqueCompanies = [...new Set(companiesList.map(company => company.company))];

  const countriesList = parsedCSVModified.map(item => item.Country_source_CB);
  // const uniqueCountries = [...new Set(countriesList)];
  const uniqueCountries = Array.from(new Set(countriesList));

  // Then add to your data object
  const data = { "bombs": parsedCSVModified, "companies": uniqueCompanies, "countries": uniqueCountries }

  res.status(200).json(data);
}
