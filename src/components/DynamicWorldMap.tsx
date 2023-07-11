import React from 'react';
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';
import 'leaflet-color-markers';

import 'leaflet/dist/leaflet.css';

import customColors from '../../palette.js';

interface BombData {
  new_project: boolean;
  potential_gtco2: number;
  latitude: number;
  longitude: number;
  name: string;
  country: string;
}

interface DynamicWorldMapProps {
  bombsData: BombData[];
  className?: string;  // optional as it seems to be in your code
}



const DynamicWorldMap: React.FC<DynamicWorldMapProps> = ({ bombsData, className }) => {
  const sizeFactor = 1.5;

  return (
    <div className={className ? className : 'h-screen w-full'}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={2}
        minZoom={2}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {bombsData.length > 0
          ? bombsData.map((data, index) => {


            // Check if Latitude or Longitude are undefined
            if (!data.latitude || data.latitude === 'None' || !data.longitude || data.longitude === 'None') {
              // if (!(data.latitude && data.latitude !== 'None' && 'latitude' in data) || !(data.longitude && data.longitude !== 'None' && 'longitude' in data)) {
              // if (!(data.latitude && 'latitude' in data) || !(data.longitude && 'longitude' in data)) {
              // console.error('Invalid coordinates for bombData:', data);
              return null; // Don't render a CircleMarker for this bombData
            }

            const color = data.new_project
              ? customColors.customNew
              : customColors.customExisting; // Change colors based on your preference
            const radius = data.potential_gtco2 * sizeFactor;
            // console.log(data.name, data.country, data.new_project, color);


            // const color = data.new_project ? customColors.customNew : customColors.customExisting; // Change colors based on your preference
            // const radius = data.potential_gtco2 * sizeFactor;

            return (
              <CircleMarker
                key={index}
                center={[data.latitude, data.longitude]}
                radius={radius}
                fillOpacity={0.7}
                color={color}
              >
                <Popup>
                  <span>
                    <span className="text-lg"><a href={data.gem_source} target="_blank"><b>{data.name}</b></a></span><br />
                    <b>Fuel type:</b> {data.fuel_type}<br />
                    <b>Country:</b> {data.country}<br />
                    <b>Operating companies:</b> {data.parent_company}<br />
                    <b>Potential GtCO2:</b> {data.potential_gtco2.toFixed(2)}<br />
                    <b>Project completion status:</b> {data.new_project ? "Not started yet" : "Already started"}<br />
                    {/* <b>Color:</b> {color}<br /> */}
                  </span>
                </Popup>
              </CircleMarker>
            );
          }) : null}
      </MapContainer>
    </div>
  );
};

export default DynamicWorldMap;
