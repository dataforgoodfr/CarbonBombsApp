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
    <div>
      <DynamicWorldMap className={className} bombsData={bombsData} />
      <p className="mt-4 text-sm"><span className="text-yellow-500">Operating projects</span> / <span className="text-red-900">New projects</span> - Size depends on the potential GtCO2 generated per carbon bomb</p>
    </div>
  ) : null;
};

export default WorldMap;
