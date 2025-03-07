import { useState } from "react";
import { Box } from "@mui/material";
import style from "@/components/Address/Modal/Address-modal.module.scss";
import ArrowLeft from "@/containers/svg-icons/arrow-left";
import { GetAddress_ResponseData } from "@/services/address/types";
import { SavedAddressDataType } from "@/redux/addresses/slice";
import dynamic from "next/dynamic";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";
const MapComp = dynamic(
  () => import("@/components/Address/Modal/Map-Form/map-search/map-search"),
  { ssr: false }
);
const Map = dynamic(() => import("@/components/Address/Modal/Map/Map"), {
  ssr: false,
});
const MapForm = dynamic(
  () => import("@/components/Address/Modal/Map-Form/Map-Form"),
  { ssr: false }
);
const SectionLoader = dynamic(
  () => import("@/components/Section-loader/section-loader"),
  { ssr: false }
);
const BoxTitle = dynamic(() => import("@/components/BoxTitle/Box-title"), {
  ssr: false,
});

export type addressFields = {
  search: string;
  house: string;
  society: string;
  area: string;
  errorSearch: string;
  errorHouse: string;
  errorSociety: string;
  errorArea: string;
};

interface IProps {
  isLoaded: boolean;
  getAddressData: GetAddress_ResponseData[];
  backBtn: () => void;
  setCurrentLocationBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
  currentLocationBtnClicked: boolean;
  setMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  mapLoaded: boolean;
  status: string;
  ready: boolean;
  setAddressFieldInput: React.Dispatch<React.SetStateAction<addressFields>>;
  addressFieldInput: addressFields;
  value: string;
  setValue: (address: string) => void;
  clearSuggestions: () => void;
  mapRef: google.maps.Map | undefined;
  handleSetMapRefState: (map: google.maps.Map) => void;
  handleCurrentLocationClick: () => void;
  setMapIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  mapIsDragging: boolean;
  handleSaveAddress: (addressType: string, customAddress: string) => void;
  data: SavedAddressDataType;
}

const MapWrapper: React.FC<IProps> = ({
  isLoaded,
  getAddressData,
  backBtn,
  setCurrentLocationBtnClicked,
  currentLocationBtnClicked,
  setMapLoaded,
  mapLoaded,
  status,
  ready,
  setAddressFieldInput,
  addressFieldInput,
  value,
  setValue,
  data,
  clearSuggestions,
  mapRef,
  handleSetMapRefState,
  handleCurrentLocationClick,
  setMapIsDragging,
  mapIsDragging,
  handleSaveAddress,
}) => {
  const [inputValue, setInputValue] = useState("");
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
    <>
      {isLoaded ? (
        <>
          {getAddressData?.length > 0 && (
            <button className={style.backBtn} onClick={backBtn}>
              <ArrowLeft />
            </button>
          )}
          <Box className={style.AddAddressBox}>
            <Box className={style.gridBox}>
              <BoxTitle boxTitle={getText("Add-New-Address")} />
              <MapComp
                setInputValue={setInputValue}
                inputValue={inputValue}
                setCurrentLocationBtnClicked={setCurrentLocationBtnClicked}
                mapLoaded={mapLoaded}
                status={status}
                ready={ready}
                setAddressFieldInput={setAddressFieldInput}
                addressFieldInput={addressFieldInput}
                value={value}
                setValue={setValue}
                data={data}
                clearSuggestions={clearSuggestions}
                mapRef={mapRef}
                handleSetMapRefState={handleSetMapRefState}
              />
              <Map
                setInputValue={setInputValue}
                setMapIsDragging={setMapIsDragging}
                setCurrentLocationBtnClicked={setCurrentLocationBtnClicked}
                currentLocationBtnClicked={currentLocationBtnClicked}
                setMapLoaded={setMapLoaded}
                setValue={setValue}
                handleCurrentLocationClick={handleCurrentLocationClick}
                handleSetMapRefState={handleSetMapRefState}
                mapRefState={mapRef}
              />
            </Box>
            <MapForm
              getAddressData={getAddressData}
              mapIsDragging={mapIsDragging}
              setAddressFieldInput={setAddressFieldInput}
              addressFieldInput={addressFieldInput}
              handleSaveAddress={handleSaveAddress}
            />
          </Box>
        </>
      ) : (
        <SectionLoader />
      )}
    </>
  );
};

export default MapWrapper;
