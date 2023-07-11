import { useEffect, useState } from 'react';

const useNeo4jClient = (query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const res = await fetch('/api/neo4j', {
        method: 'POST',
        body: JSON.stringify({
          query,
        }),
      });
      let jsonData = await res.json();
      if (jsonData.length === 1) {
        jsonData = jsonData[0]
      }
      setLoading(false);
      setData(jsonData);
    };

    fetchData();
  }, [query]);

  return { data, loading };
};

export default useNeo4jClient;
