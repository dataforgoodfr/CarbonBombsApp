import { createContext, useEffect, useState } from 'react';

export const CompaniesContext = createContext();

export const CompaniesProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch('/api/neo4j?entity=Company');
      const jsonData = await res.json();
      setLoading(false);
      setCompanies(jsonData);
    };

    fetchData();
  }, []);

  return (
    <CompaniesContext.Provider
      value={{
        companies,
        loading,
      }}
    >
      {children}
    </CompaniesContext.Provider>
  );
};

export default CompaniesContext;
