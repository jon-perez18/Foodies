/* eslint-disable */
import React, { Component } from 'react';
import './MyMap.css';
import {  MapContainer,  TileLayer, Marker, Popup } from 'react-leaflet';
import {Icon } from 'leaflet';

function MyMap(){
 
return (
<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.20]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  <Marker position={[51.505, -0.44]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  <Marker position={[51.505, -0.70]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  <Marker position={[51.505, -0.80]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  <Marker position={[51.505, -0.4664]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
  
)
}
 export default MyMap;
