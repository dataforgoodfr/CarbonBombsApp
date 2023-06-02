import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css'; // Add this line

const DynamicWorldMap = dynamic(() => import('./DynamicWorldMap').then(mod => mod.default), {
  ssr: false,
});

const WorldMap = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <DynamicWorldMap /> : null;
};

export default WorldMap;
