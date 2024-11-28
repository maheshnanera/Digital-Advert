/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import {
  GoogleMap, Polygon, useJsApiLoader, Marker,
} from '@react-google-maps/api';
import tvScreenImage from '../../assets/Images/tvScreen.svg';

function GeoMap(props) {
  const { geoJSONData, geoScreenLocations } = props;
  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 51.51564, lng: -0.09351 });
  const [zoom, setZoom] = useState(6);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    id: 'google-map-script',
  });

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  useEffect(() => {
    if (map && geoJSONData && Array.isArray(geoJSONData) && geoJSONData.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      const paths = [];
      if (geoJSONData && geoJSONData.length > 0) {
        geoJSONData.forEach((feature) => {
          if (feature.geoLocation && feature.geoLocation.geometry) {
            const { coordinates } = feature.geoLocation.geometry;
            if (coordinates && coordinates.length > 0) {
              const firstCoord = coordinates[0];
              const coordArray = JSON.parse(firstCoord.replace(/'/g, '"'));
              const path = { lat: coordArray[1], lng: coordArray[0] };

              if (path.lat && path.lng) {
                bounds.extend(new window.google.maps.LatLng(path.lat, path.lng));
              }
            }
          }
        });
      }
      map.fitBounds(bounds);
      const zoomChangedListener = map.addListener('zoom_changed', () => {
        const currentZoom = map.getZoom();
        if (currentZoom > 10) {
          map.setZoom(10);
        }
        window.google.maps.event.removeListener(zoomChangedListener);
      });
    }
  }, [map, geoJSONData]);

  const polygons = useMemo(() => {
    if (!Array.isArray(geoJSONData)) return [];

    return geoJSONData.map((data) => {
      if (data.geoLocation && data.geoLocation.geometry) {
        const { coordinates } = data.geoLocation.geometry;
        if (Array.isArray(coordinates) && coordinates.length > 0) {
          const paths = coordinates.map((coord) => {
            const coordArray = JSON.parse(coord.replace(/'/g, '"'));
            return { lat: coordArray[1], lng: coordArray[0] };
          });
          return {
            paths,
            options: {
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
            },
          };
        }
      }
      return null;
    }).filter(Boolean);
  }, [geoJSONData]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ position: 'relative', height: '520px' }}>
      <GoogleMap
        center={mapCenter}
        onLoad={onLoad}
        zoom={zoom}
        options={{ maxZoom: 10 }}
        mapContainerStyle={{ height: '100%', marginTop: '20px' }}
      >
        {polygons.map((polygon, index) => (
          <Polygon key={index} paths={polygon.paths} options={polygon.options} />
        ))}
        {geoScreenLocations.length > 0 && geoScreenLocations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            icon={{
              url: tvScreenImage,
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default GeoMap;
