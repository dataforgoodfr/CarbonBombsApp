import { createContext, useEffect, useState } from 'react';


type ContextType = {
  data: {
    bombs: any[];  // replace any[] with your actual data type
    companies: string[];
    countries: string[];
  };
  loading: boolean;
};


// export const DataContext = createContext<any[]>([]);
// export const DataContext = createContext([]);
export const DataContext = createContext<ContextType>({ data: { bombs: [], companies: [], countries: [] }, loading: false });
// export const DataContext = createContext<ContextType>({ data: [], loading: false });

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ bombs: [], companies: [], countries: [] });
  // const [data, setData] = useState<any[]>([]);  // Replace any[] with the type of data you have
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
