import React from "react";
import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { useState } from 'react'

const containerStyle = {
  width: "100%",
  height: "400px",
};

//Pass in the coordinates so that the marker is displayed
const Map = ({ coordinates }) => {

  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  const zoom = coordinates.length > 1 ? 5 : 15

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates[0]}
        zoom={zoom}
        >
        {coordinates.length > 1 ? coordinates.map(coordinate => 
         <MarkerF position={coordinate} onClick={() => setInfoWindowVisible(!infoWindowVisible)}>
         {infoWindowVisible && (
         <InfoWindowF onCloseClick={() => setInfoWindowVisible(false)}>
           <div>
             <h4>Flatify rocksssss</h4>
             <p>project of the year</p>
           </div>
         </InfoWindowF>
         )}

       </MarkerF>) :  
       (<MarkerF position={coordinates[0]} onClick={() => setInfoWindowVisible(!infoWindowVisible)}>
            {infoWindowVisible && (
            <InfoWindowF onCloseClick={() => setInfoWindowVisible(false)}>
              <div>
                <h4>Flatify rocksssss</h4>
                <p>project of the year</p>
              </div>
            </InfoWindowF>
            )}
         </MarkerF>)
        }
        {/* {coordinates[0].lat && coordinates[0].lng && (
          <MarkerF position={coordinates[0]} onClick={() => setInfoWindowVisible(!infoWindowVisible)}>
            {infoWindowVisible && (
            <InfoWindowF onCloseClick={() => setInfoWindowVisible(false)}>
              <div>
                <h4>Flatify rocksssss</h4>
                <p>project of the year</p>
              </div>
            </InfoWindowF>
            )}
          </MarkerF>
          )}        */}
      </GoogleMap>
    </>
  );
};

export default Map;
