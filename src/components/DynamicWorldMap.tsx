import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Marker, Popup } from 'react-leaflet';

const DynamicWorldMap = () => {


  // Generate random dataset
  const generateRandomDataset = () => {
    const categories = ['oil', 'gas', 'coal'];
    const dataset = [];
    const numDots = 100; // Number of dots to display

    for (let i = 0; i < numDots; i++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomRadius = Math.floor(Math.random() * 10) + 5; // Random radius between 5 and 15
      const randomLatLng = [
        Math.random() * 180 - 90, // Random latitude between -90 and 90
        Math.random() * 360 - 180, // Random longitude between -180 and 180
      ];
      dataset.push({ category: randomCategory, radius: randomRadius, latlng: randomLatLng });
    }

    return dataset;
  };

  const position = [51.505, -0.09]

  const dots = generateRandomDataset();

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[0, 0]} // Center of the map
        zoom={2} // Initial zoom level
        className="h-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Render dots */}
        {dots.map((dot, index) => (
          <CircleMarker
            key={index}
            center={dot.latlng}
            radius={dot.radius}
            pathOptions={{
              color: dot.category === 'oil' ? 'red' : dot.category === 'gas' ? 'blue' : 'green',
              fillOpacity: 0.8,
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default DynamicWorldMap;
