/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { useAppSelector } from './use-app-selector';

const useGoogleMapLoad = () => {
    const libraries = useMemo(() => ['places'], []);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { activeSelectedTab } = useAppSelector((state) => state.AddressPopup);

    const { isLoaded: isGoogleMapsLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
        libraries: libraries as any,
    });

    useEffect(() => {
        if (isGoogleMapsLoaded && !activeSelectedTab) {
            setIsLoaded(true);
        }
    }, [activeSelectedTab, isGoogleMapsLoaded]);


    return isLoaded
};

export default useGoogleMapLoad;
