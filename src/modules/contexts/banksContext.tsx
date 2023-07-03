import { createContext, useEffect, useState } from 'react';

export const BanksContext = createContext();

export const BanksProvider = ({ children }) => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch('/api/neo4j', {
        method: 'POST',
        body: JSON.stringify({
          query:
            'MATCH (n:banks) RETURN n, SIZE([(n)--() | n]) AS RelationshipCount ORDER BY RelationshipCount DESC;',
        }),
      });
      const jsonData = await res.json();
      setLoading(false);
      setBanks(jsonData);
    };

    fetchData();
  }, []);

  return (
    <BanksContext.Provider
      value={{
        banks,
        loading,
      }}
    >
      {children}
    </BanksContext.Provider>
  );
};

export default BanksContext;
