import { createContext, useEffect, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const jsonData = await res.json();
      setData(jsonData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
