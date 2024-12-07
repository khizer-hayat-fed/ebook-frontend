import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 31.36865,
  lng: 74.3140,
};

export const MapMarker = ({form, setForm}) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const onMapClick = useCallback((event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setMarkerPosition({ lat: newLat, lng: newLng });
    setForm(prevForm => ({
      ...prevForm,
      location: { lat: newLat, lng: newLng },
    }));
  }, []);

  useEffect(()=>{
    if(form.location?.lat){
      setMarkerPosition(form?.location)
    }
  },[form])

  return (
    <LoadScript googleMapsApiKey="AIzaSyDzSwDLwxMVDp3-YOuQ_iVpsWhvGDYTP0I">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={onMapClick}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            onLoad={(marker) => {
              console.log('Marker loaded:', marker);
            }}
            onError={(error) => {
              console.error('Error loading marker:', error);
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};