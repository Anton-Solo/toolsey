'use client';

import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';

const center = {
  lat: 39.95737,  
  lng: -85.92280
};

export const MapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={15}
      center={center}
      mapContainerClassName="w-[528px] h-[408px] rounded-4xl"
    >
      <MarkerF position={center} />
    </GoogleMap>
  );
};