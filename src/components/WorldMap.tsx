import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

import 'leaflet/dist/leaflet.css'; // Add this line

const DynamicWorldMap = dynamic(
  () => import('./DynamicWorldMap').then((mod) => mod.default),
  {
    ssr: false,
  }
);

// Define a type for the props
type WorldMapProps = {
  bombsData: any;
  className?: string; // Make className an optional prop
};

const WorldMap: React.FC<WorldMapProps> = ({ bombsData, className }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <DynamicWorldMap className={className} bombsData={bombsData} />
  ) : null;
};

export default WorldMap;
