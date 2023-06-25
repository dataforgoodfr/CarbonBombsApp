import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

import 'leaflet/dist/leaflet.css'; // Add this line


const DynamicWorldMap = dynamic(() => import('./DynamicWorldMap').then(mod => mod.default), {
  ssr: false,
});

const WorldMap = ({ bombsData }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <DynamicWorldMap bombsData={bombsData} /> : null;
};

export default WorldMap;
