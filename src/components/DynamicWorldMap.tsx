import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-color-markers';

import customColors from '../../palette.js';



const DynamicWorldMap = ({ bombsData }) => {

  const sizeFactor = 1;

  return (
    <div className="h-screen w-full">
      <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bombsData.length > 0 ? bombsData.map((data, index) => {
          const color = data.New_project_source_CB ? customColors.customNew : customColors.customExisting; // Change colors based on your preference
          const radius = data.Potential_GtCO2_source_CB * sizeFactor;

          return (
            <CircleMarker
              key={index}
              center={[data.Latitude, data.Longitude]}
              radius={radius}
              fillOpacity={0.5}
              color={color}
            >
              <Popup>
                <span>
                  <b>Carbon bomb name:</b> {data.Carbon_bomb_name_source_CB}<br />
                  <b>Country:</b> {data.Country_source_CB}<br />
                  // Continue with other data fields
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