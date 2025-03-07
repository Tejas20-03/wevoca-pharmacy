import { Box } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import SearchIcon from '@/components/Global-Icon/Search-Icon';
import { Search, SearchIconWrapper, StyledInputBase } from '@/components/Search/Search-mui-style';
import Style from './map-result.module.scss';
import { getGeocode } from 'use-places-autocomplete';
import { locationActions } from '@/redux/location_slice/location-slice';
import { panToCurrentLocation } from '@/redux/location_slice/location-action';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { mapActions } from '@/redux/map/slice';
import { useAppSelector } from '@/hooks/use-app-selector';
import CloseIcon from '@/containers/svg-icons/close-icon';
import { addressFields } from '@/components/Address/Modal/Map-Wrapper/Map-Wrapper';
import { SavedAddressDataType } from '@/redux/addresses/slice';
import { useLanguage } from '@/language-context/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { GetTranslatedData } from '@/services/footer/services';
import Cookies from 'js-cookie';

interface IProps {
    mapRef: google.maps.Map | undefined
    handleSetMapRefState: (map: google.maps.Map) => void;
    value: string,
    setValue: (address: string) => void,
    data: SavedAddressDataType,
    clearSuggestions: () => void;
    setAddressFieldInput: React.Dispatch<React.SetStateAction<addressFields>>,
    addressFieldInput: addressFields
    ready: boolean;
    status: string;
    mapLoaded: boolean
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    inputValue: string;
    setCurrentLocationBtnClicked: React.Dispatch<React.SetStateAction<boolean>>
}

const MapComp: React.FC<IProps> = ({ inputValue, setInputValue, setCurrentLocationBtnClicked, mapLoaded, status, ready, mapRef, handleSetMapRefState, value, setValue, data, clearSuggestions, setAddressFieldInput, addressFieldInput }) => {
    const [searchText, setSearchText] = useState<string>("")
    const [canShowAutoComplete, setCanShowAutoComplete] = useState(false);
    const [isFocusingOnInput, setIsFocusingOnInput] = useState(false);
    const [inputRefState, setInputRefState] = useState(undefined);
    const [setInputFocusedAlreadySetToTrue, handleSetInputFocusedAlreadySetToTrue] = useState<boolean>(false);
    const [isFocusing, setIsFocusing] = useState<boolean>(false);
    const [dropdown, setDropdown] = useState(false);
    const [selectedAddressMapUpdate, setSelectedAddressMapUpdate] = useState<boolean>(false);

    const { selectedAddress } = useAppSelector((state) => state.map);

    const handleSetInputRef = (inputRef: any) => {
        setInputRefState(inputRef)
    }

    const handleSearch = () => {
        if (searchText !== '') {
            setSearchText('')
        }
    }
    const handleKeyDown = (event) => {
        if (searchText !== '') {
            if (event.key === "Enter") {
                setSearchText('')
            }
        }
    }

    const handleInput = (e: any) => {
        const inputValue = e.target.value.trim();
        setInputValue(e.target.value);
        if (inputValue.length > 4) {
            setValue(e.target.value)
            setCanShowAutoComplete(true);
            setAddressFieldInput((prev) => ({ ...prev, search: e.target.value }))
            setDropdown(true)
            if (e.target.value.length <= 1 || data.length === 0) {
                clearSuggestions();
                setDropdown(false);
            }
        } else {
            setValue('')
        }
    }


    const handleSetIsFocusingOnInput = (val: boolean) => {
        if (val) {
            setIsFocusingOnInput(val);
            inputRefState?.current?.select();
        }
        else {
            setTimeout(() => {
                setIsFocusingOnInput(val);
                setCanShowAutoComplete(val);
            }, 100)
        }
    }
    const inputRef = useRef<HTMLInputElement>(null);
    const focusInput = () => inputRef.current?.focus();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (handleSetInputRef !== undefined) handleSetInputRef(inputRef);
    }, []);

    useEffect(() => {
        if (handleSetIsFocusingOnInput !== undefined) {
            if (!setInputFocusedAlreadySetToTrue && isFocusing) {
                handleSetIsFocusingOnInput(isFocusing);
                handleSetInputFocusedAlreadySetToTrue(true);
            }
            else if (setInputFocusedAlreadySetToTrue && !isFocusing) {
                handleSetIsFocusingOnInput(isFocusing);
                handleSetInputFocusedAlreadySetToTrue(false);
            }
        }
    }, [canShowAutoComplete, value])

    const handleSelect = async (address: any) => {
        setSelectedAddressMapUpdate(true)
        setAddressFieldInput((prev) => ({ ...prev, search: address }))
        setValue(address);
        clearSuggestions();
        setDropdown(false);
        setCurrentLocationBtnClicked(false)
        try {
            const results = await getGeocode({ address });
            dispatch(mapActions.setMap({
                selectedAddress: address,
                selectedGeocode: { latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() },
                region: { latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() }
            }));
            dispatch(locationActions.setSelectedGeocode({ latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() }))
            dispatch(panToCurrentLocation(mapRef, { latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() }));
            handleSetMapRefState(mapRef);
        } catch (error) {
            console.log("Error: ", error)
        }
    };




    const suggestions = useMemo(() => {
        if (canShowAutoComplete) setDropdown(true);
        else setDropdown(false);

        if (status === 'OK') {
            return data.map((prediction, index) => (
                <li key={index} onClick={() => handleSelect(prediction.description)}>
                    {prediction.description}
                </li>
            ));
        }
        return null;
    }, [data, status]);




    const emptyAddress = () => {
        setValue('');
        setInputValue('');
        setAddressFieldInput((prev) => ({ ...prev, search: '' }))
    }



    useEffect(() => {
        setInputValue(selectedAddress);
        setAddressFieldInput((prev) => ({ ...prev, search: selectedAddress }));
    }, [selectedAddress, mapLoaded, setValue, setAddressFieldInput]);

    const { language } = useLanguage();

    const { data: translatedData } = useQuery(
      ["complain-form"],
      async () => {
        return await GetTranslatedData({ token: "" });
      },
      {
        retry: (failureCount, error) => {
          const token = Cookies.get("auth-token");
          return !token;
        },
        retryDelay: 0,
        staleTime: 600000,
      }
    );
  
    const getText = (value: string) => {
      const translatedItems = translatedData?.Data || [];
      const item = translatedItems.find((item: any) => item.Value === value);
      return language === "ar" ? item?.Arabic : item?.English;
    };


    return (
        <Box className={`${Style.search}`}>
            <Search>
                <SearchIconWrapper className={Style.searchIconWrapper} onClick={handleSearch}>
                    <SearchIcon color='--primary-color' />
                </SearchIconWrapper>

                <StyledInputBase
                    placeholder={getText("Search-Here")}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    value={inputValue || value}
                    disabled={!ready}
                    ref={handleSetInputRef}
                    onFocus={setIsFocusing.bind(this, true)}
                    onBlur={setIsFocusing.bind(this, false)}
                    className={Style.addressSearch}
                />
                <span className={Style.error}>{addressFieldInput?.errorSearch}</span>
                <Box className={Style.textRemove}>
                    <button onClick={emptyAddress} className={`${Style.closeBtn} close-alert`}><CloseIcon color='--primary-color' /></button>
                </Box>
            </Search>
            <div className={`${Style.searchResultBox} ${!dropdown && Style.searchBoxClosed}`}>
                <ul>
                    {suggestions}
                </ul>
            </div>
        </Box>
    )
}

export default MapComp