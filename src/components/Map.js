import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Map = ({ coordinates }) => {
  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={16}
      >
        {coordinates.lat && coordinates.lng && (
          <Marker position={coordinates} />
        )}
      </GoogleMap>
  );
};

export default Map;
