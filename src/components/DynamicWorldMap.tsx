import React from 'react';
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';
import 'leaflet-color-markers';

import 'leaflet/dist/leaflet.css';

import customColors from '../../palette.js';

interface BombData {
  New_project_source_CB: boolean;
  Potential_GtCO2_source_CB: number;
  Latitude: number;
  Longitude: number;
  Carbon_bomb_name_source_CB: string;
  Country_source_CB: string;
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
            if (!(data.Latitude && 'Latitude' in data) || !(data.Longitude && 'Longitude' in data)) {
              console.error('Invalid coordinates for bombData:', data);
              return null; // Don't render a CircleMarker for this bombData
            }

            const color = data.New_project_source_CB
              ? customColors.customNew
              : customColors.customExisting; // Change colors based on your preference
            const radius = data.Potential_GtCO2_source_CB * sizeFactor;

            // const color = data.New_project_source_CB ? customColors.customNew : customColors.customExisting; // Change colors based on your preference
            // const radius = data.Potential_GtCO2_source_CB * sizeFactor;

            return (
              <CircleMarker
                key={index}
                center={[data.Latitude, data.Longitude]}
                radius={radius}
                fillOpacity={0.7}
                color={color}
              >
                <Popup>
                  <span>
                    <b>Carbon bomb name:</b> {data.Carbon_bomb_name_source_CB}<br />
                    <b>Country:</b> {data.Country_source_CB}<br />
                    <b>Color:</b> {color}<br />
                    <b>New:</b> {data.New_project_source_CB ? "New" : "Old"}<br />
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
