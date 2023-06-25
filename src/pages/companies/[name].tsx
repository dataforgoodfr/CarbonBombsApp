import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Company() {
  const router = useRouter();
  const { name } = router.query;
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/neo4j');
      const jsonData = await res.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  console.log(data);
  return (
    <div className='py-12'>
      <Link className='mb-8 block text-xl text-blue-400' href='/companies'>
        ⬅ Back
      </Link>
      <h1>Company Detail for: {name}</h1>
      {/* Your other components and content go here */}
    </div>
  );
}
