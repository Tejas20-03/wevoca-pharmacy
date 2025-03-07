/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Map.module.scss';
import { GoogleMap } from '@react-google-maps/api';
import { Box, Typography } from '@mui/material';
import { locationActions } from '@/redux/location_slice/location-slice';
import { AppDispatch } from '@/types/redux-types';
import { mapActions, mapInitialState } from '@/redux/map/slice';
import LocationIcon from '@/components/Global-Icon/Location-icon';
import CurrentLocation from '@/containers/svg-icons/current-location';
import { useAppSelector } from '@/hooks/use-app-selector';
import CautionIcon from '@/containers/svg-icons/caution';
import LocationDeniedPopup from '@/components/location-denined-popup/location-denied-popup';
import { openPermissionDenined } from '@/redux/permission-denied-popup/slice';
import debounce from 'lodash/debounce';



interface Props {
    mapRefState: unknown,
    handleSetMapRefState: (map: google.maps.Map) => void,
    handleCurrentLocationClick: () => void;
    setValue: (address: string) => void;
    setMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    setMapIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentLocationBtnClicked: React.Dispatch<React.SetStateAction<boolean>>
    currentLocationBtnClicked: boolean;
}

const Map: React.FC<Props> = ({ setInputValue, setMapIsDragging, setCurrentLocationBtnClicked, currentLocationBtnClicked, setMapLoaded, handleSetMapRefState, mapRefState, handleCurrentLocationClick, setValue }) => {
    const center = { lat: mapInitialState.region.latitude, lng: mapInitialState.region.longitude };
    const dispatch = useDispatch<AppDispatch>();
    const [mapCenter, setMapCenter] = useState(center);
    const mapRef = useRef<unknown>();
    const locationData = useAppSelector((state) => state.location);
    const { selectedAddress } = useAppSelector((state) => state.map);
    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            gestureHandling: "greedy",
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },
        }),
        []
    );


    const onMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;
        handleSetMapRefState(map);
        setTimeout(() => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    dispatch(locationActions.setCurrentLocationDenied(false));
                    dispatch(
                        locationActions.setSelectedGeocode({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        })
                    );
                    dispatch(
                        mapActions.setMap({
                            selectedGeocode: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            },
                            region: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            },
                        })
                    );
                    if (mapRef !== undefined) {
                        mapRef.current.panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                        mapRef.current.setZoom(16);
                    }
                },
                (error) => {
                    if (error?.code === error?.PERMISSION_DENIED) {
                        dispatch(locationActions.setCurrentLocationDenied(true));
                    }
                }
            );
        }, 1500);
    };





    const handleOnMapDragEnd = () => {
        setMapIsDragging(true);
        debouncedHandleOnMapDragEnd();
    };

    const debouncedHandleOnMapDragEnd = debounce(async () => {
        const mapCenter = mapRef.current.getCenter();
        setMapCenter(mapCenter);
        setMapLoaded(true);
        dispatch(
            mapActions.setMap({
                selectedAddress: `${mapRef?.current?.center?.lat()},${mapRef?.current?.center?.lng()}`,
                selectedGeocode: {
                    latitude: mapRef?.current?.center?.lat(),
                    longitude: mapRef?.current?.center?.lng(),
                },
                region: {
                    latitude: mapRef?.current?.center?.lat(),
                    longitude: mapRef?.current?.center?.lng(),
                },
            })
        );
        setMapIsDragging(false);
        setValue('')
        setInputValue('')
    }, 2000);


    useEffect(() => {
        // Clean up the debounce function on component unmount
        return () => {
            debouncedHandleOnMapDragEnd.cancel();
        };
    }, []);

    useEffect(() => {
        if (currentLocationBtnClicked && mapRef?.current?.center?.lat() !== undefined && mapRef?.current?.center?.lng() !== undefined) {
            setInputValue(`${mapRef?.current?.center?.lat()},${mapRef?.current?.center?.lng()}`)
            dispatch(mapActions.setMap({
                selectedAddress: `${mapRef?.current?.center?.lat()},${mapRef?.current?.center?.lng()}`,
                selectedGeocode: {
                    latitude: mapRef?.current?.center?.lat(),
                    longitude: mapRef?.current?.center?.lng(),
                },
                region: {
                    latitude: mapRef?.current?.center?.lat(),
                    longitude: mapRef?.current?.center?.lng(),
                },
            }));
        }
    }, [currentLocationBtnClicked, mapRef, locationData, locationData.permissionDenied])

    useEffect(() => {
        dispatch(mapActions.setMap({ selectedAddress: '' }));
        setCurrentLocationBtnClicked(false)
    }, [])

    const getLocation = async () => {
        setInputValue(`${mapRef?.current?.center?.lat()},${mapRef?.current?.center?.lng()}`)
        handleCurrentLocationClick();
        dispatch(mapActions.setMap({
            selectedAddress: `${mapRef?.current?.center?.lat()},${mapRef?.current?.center?.lng()}`, selectedGeocode: {
                latitude: mapRef?.current?.center?.lat(),
                longitude: mapRef?.current?.center?.lng(),
            },
            region: {
                latitude: mapRef?.current?.center?.lat(),
                longitude: mapRef?.current?.center?.lng(),
            },
        }));
        setCurrentLocationBtnClicked(true)
    }

    const getLocation2 = async () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(locationActions.setCurrentLocationDenied(false));
                dispatch(
                    locationActions.setSelectedGeocode({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                );
                dispatch(
                    mapActions.setMap({
                        selectedGeocode: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        },
                        region: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        },
                    })
                );
                if (mapRef !== undefined) {
                    mapRef.current.panTo({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    mapRef.current.setZoom(16);
                    getLocation();
                }
            },
            (error) => {
                if (error?.code === error?.PERMISSION_DENIED) {
                    dispatch(locationActions.setCurrentLocationDenied(true));
                }
            });
    }

    return (
        <>
            <div className={styles.container}>
                {locationData.permissionDenied !== null && locationData.permissionDenied &&
                    <Box className={styles.mapDenied}><CautionIcon /><Typography>We’re having trouble finding you. Check your location access.
                        {navigator?.userAgentData !== undefined && navigator?.userAgentData?.brands && navigator?.userAgentData?.brands?.[2]?.brand === 'Google Chrome' && <button onClick={() => dispatch(openPermissionDenined())}> See how to enable location access</button>}
                    </Typography></Box>}
                <GoogleMap
                    options={mapOptions}
                    zoom={14}
                    center={mapCenter}
                    mapContainerStyle={{ width: '100%', height: '300px' }}
                    onLoad={onMapLoad}
                    onDragEnd={handleOnMapDragEnd}
                >
                    <div className={styles.mapCenterMarker}><LocationIcon color='--primary-color' /></div>
                    {locationData.permissionDenied !== null && locationData.permissionDenied ?
                        <button className={styles.currentLocationBtnGreyed} onClick={getLocation2} title=''><CurrentLocation color='var(--text-color-alt)' /></button>
                        :
                        locationData.permissionDenied === null ?
                            <button className={styles.currentLocationBtnGreyed} onClick={getLocation2} title=''><CurrentLocation color='var(--text-color-alt)' /></button>
                            :
                            <button className={styles.currentLocationBtn} title='' onClick={getLocation}><CurrentLocation color='var(--text-color-alt)' /></button>
                    }
                </GoogleMap>
            </div>
            <LocationDeniedPopup mapRefState={mapRef} />
        </>
    );
}

export default  React.memo(Map);

