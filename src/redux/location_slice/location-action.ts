
/* eslint-disable @typescript-eslint/no-unused-vars */
import { locationActions } from './location-slice';
import { MAPS_API_KEY } from '@/Constants/constants';
import { AppDispatch, selectedGeocodeType } from '@/types/redux-types';

export const setLocationToCurrentLocation = (mapRef: google.maps.Map | undefined) => {
  return async (dispatch: AppDispatch) => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(locationActions.setCurrentLocationDenied(false))
      dispatch(panToCurrentLocation(mapRef, { latitude: position.coords.latitude, longitude: position.coords.longitude }))
      dispatch(locationActions.setSelectedGeocode({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
    }, (error) => {
      if (error?.code === error?.PERMISSION_DENIED) {
        dispatch(locationActions.setCurrentLocationDenied(true))
      }
    })
  }
}

export const panToCurrentLocation = (mapRef: google.maps.Map | undefined, geocode: selectedGeocodeType) => {
  return async (dispatch: AppDispatch) => {
    if (mapRef !== undefined) {
      mapRef.panTo({ lat: geocode.latitude, lng: geocode.longitude });
      mapRef.setZoom(16);
    }

    // dispatch(setPhysicalAddressOfCurrentLocation(geocode));
  };
};

export const setPhysicalAddressOfCurrentLocation = (geocode: selectedGeocodeType) => {
  return async (dispatch: AppDispatch) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${geocode.latitude},${geocode.longitude}&key=${MAPS_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(locationActions.setSelectedAddress(data.results[1]?.formatted_address))
      });
  };
};
