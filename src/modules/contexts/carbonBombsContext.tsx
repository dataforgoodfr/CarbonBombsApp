import { createContext, useEffect, useState } from 'react';

export const CarbonBombsContext = createContext();

export const CarbonBombsProvider = ({ children }) => {
  const [carbonBombs, setCarbonBombs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch('/api/neo4j?entity=Carbon_bombs');
      const jsonData = await res.json();
      setLoading(false);
      setCarbonBombs(jsonData);
    };

    fetchData();
  }, []);

  return (
    <CarbonBombsContext.Provider
      value={{
        carbonBombs,
        loading,
      }}
    >
      {children}
    </CarbonBombsContext.Provider>
  );
};

export default CarbonBombsContext;
