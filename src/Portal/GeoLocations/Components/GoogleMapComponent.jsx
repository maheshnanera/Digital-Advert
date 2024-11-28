import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GoogleMap, useJsApiLoader, Marker, Autocomplete,
} from '@react-google-maps/api';
import ConfirmPlaceModal from './AddLocationModal';
import { CreateScreenLocation, ListScreenLocation } from '../../../User/UserActions';
import { setScreenLocations } from '../../../store/slices/portalSlice';

const placeLibrary = ['places'];
function GoogleMapComponent() {
  // Load google map
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries: placeLibrary,
  });

  const { screenLocations } = useSelector((state) => state?.portal);

  const [searchResult, setSearchResult] = useState('Result: none');
  const [mapCenter, setMapCenter] = useState({ lat: 45.5017, lng: -73.5673 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [markerPositions, setMarkerPositions] = useState([
    { lat: 45.5017, lng: -73.5673 },
    { lat: 43.6532, lng: -79.3832 },
  ]);
  const dispatch = useDispatch();

  const fetchGeoLocations = async () => {
    setIsLoadingData(true);
    const geoLocationData = await ListScreenLocation();
    dispatch(setScreenLocations(geoLocationData?.items));
    setIsLoadingData(false);
  };

  useEffect(() => {
    fetchGeoLocations();
  }, []);

  const handleMapClick = async (event) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMapCenter(latLng);
    try {
      const response = await geocoder.geocode({ location: latLng });
      const place = response.results[0];

      if (place) {
        const placeDetails = {
          name: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSelectedLocation(placeDetails);
        setIsModalOpen(true);
      } else {
        setSelectedLocation(latLng);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error getting place details:', error);
    }
  };

  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };

  const onPlaceChanged = () => {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      if (place.geometry && place.geometry.location) {
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        const placeDetails = {
          name: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSelectedLocation(placeDetails);
        setIsModalOpen(true);
      }
    } else {
      alert('Please enter text');
    }
  };

  // this will save location on confirm
  const handleConfirmLocation = async () => {
    const inputData = {
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
    };

    dispatch(setScreenLocations([
      ...screenLocations,
      inputData,
    ]));

    CreateScreenLocation(inputData);
    setIsModalOpen(false);
  };

  if (!isLoaded || isLoadingData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
        <input
          type="text"
          placeholder="Search for a place"
          style={{
            boxSizing: 'border-box',
            width: '50%',
            height: '32px',
            padding: '0 12px',
            borderRadius: '3px',
            border: '1px solid rgb(242, 101, 57, 0.4)',
            fontSize: '14px',
            outline: 'none',
            textOverflow: 'ellipses',
          }}
        />
      </Autocomplete>
      <div className="mt-20">
        <GoogleMap
          center={mapCenter}
          zoom={5}
          onClick={handleMapClick}
          mapContainerStyle={{ height: '500px', width: '100%' }}
        >
          {screenLocations.map((position, index) => (
            <Marker key={index} position={position} />
          ))}
        </GoogleMap>
      </div>

      {isModalOpen && (
        <ConfirmPlaceModal
          location={selectedLocation}
          onConfirm={handleConfirmLocation}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default GoogleMapComponent;
