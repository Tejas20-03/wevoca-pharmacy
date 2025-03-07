import Buttons from "@/components/Button/Buttons";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import {
  closeAddressPopup,
  addAddress,
  showSelectedTab,
  closeStartingPopup,
  setOpenStartingPopup,
} from "@/redux/address-popup/slice";
import { SelectAddress, saveAddress } from "@/redux/addresses/actions";
import { setLocationToCurrentLocation } from "@/redux/location_slice/location-action";
import { StoreState } from "@/redux/store";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Slide, toast } from "react-toastify";
import usePlacesAutocomplete from "use-places-autocomplete";
import style from "./Address-modal.module.scss";
import SelectedAddress from "./Selected-address/selectedAddress";
import { GetCustomerTokenInLocalStorage } from "@/functions/local-storage-methods";
import { getAddress } from "@/services/address";
import { GetAddress_ResponseData } from "@/services/address/types";
import SectionLoader from "@/components/Section-loader/section-loader";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import LocationIcon from "@/components/Global-Icon/Location-icon";
import { useSwipeable } from "react-swipeable";
import dynamic from "next/dynamic";
const BoxTitle = dynamic(() => import("@/components/BoxTitle/Box-title"), {
  ssr: false,
});
const MapWrapper = dynamic(() => import("./Map-Wrapper/Map-Wrapper"), {
  ssr: false,
});
const GlobalModal = dynamic(() => import("@/components/global-modal/modal"), {
  ssr: false,
});
const CartRemoveModal = dynamic(
  () => import("@/components/cart-empty-popup/cart-empty-popup"),
  { ssr: false }
);
import useGoogleMapLoad from "@/hooks/useGoogleMap";
import { useLanguage } from "@/language-context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { GetTranslatedData } from "@/services/footer/services";
import Cookies from "js-cookie";

interface IProps {
  addressBarClicked: boolean;
  setAddressBarClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setAddNewAddressVal: React.Dispatch<React.SetStateAction<boolean>>;
  addNewAddressVal: boolean;
}

export interface radioObjProp {
  id: number;
  address: string;
  addressTag: string;
}

const StartAddressModal: React.FC<IProps> = ({
  addressBarClicked,
  setAddressBarClicked,
  setAddNewAddressVal,
  addNewAddressVal,
}) => {
  const dispatch = useAppDispatch();
  const mapData = useSelector((state: StoreState) => state.map);
  const addressData = useAppSelector((state) => state.addresses);
  const userData = useAppSelector((state) => state.user);
  const { width: windowWidth } = useWindowDimensions();
  const { openPopup, activeSelectedTab, startingPopup, openStartingPopup } =
    useAppSelector((state) => state.AddressPopup);
  const [mapRefState, setMapRefState] = useState<google.maps.Map | undefined>(
    undefined
  );
  const handleSetMapRefState = (mapRef: google.maps.Map) =>
    setMapRefState(mapRef);
  const handleCurrentLocationClick = () =>
    dispatch(setLocationToCurrentLocation(mapRefState));
  const [addressFieldInput, setAddressFieldInput] = useState({
    search: "",
    house: "",
    society: "",
    area: "",
    errorSearch: "",
    errorHouse: "",
    errorSociety: "",
    errorArea: "",
  });
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [getAddressData, setGetAddressData] = useState<
    GetAddress_ResponseData[]
  >([]);
  const [currentLocationBtnClicked, setCurrentLocationBtnClicked] =
    useState<boolean>(false);
  const [mapIsDragging, setMapIsDragging] = useState<boolean>(false);
  const userToken = GetCustomerTokenInLocalStorage();
  const isLoaded = useGoogleMapLoad();
  

  const getAddressFunc = async () => {
    const address = await getAddress({
      token: userToken !== null ? userToken : undefined,
    });
    if (address?.ResponseType === 1) {
      setGetAddressData(address.Data);
    }
    if (address?.ResponseType === "0") {
      setGetAddressData([]);
    }
  };
  const handleSaveAddress = async (
    addressType: string,
    customAddress: string
  ) => {
    const customAddressRemoved = customAddress.replace("#", " ");
    dispatch(
      saveAddress({
        addressType: addressType,
        customAddress: customAddressRemoved,
        lat: mapData.region.latitude,
        lng: mapData.region.longitude,
        area: "",
        city: mapData.selectedAddress,
        isAddressStoredInDB: true,
        house: addressFieldInput?.house,
        locationArea: addressFieldInput?.area,
      })
    )
      .unwrap()
      .then((response) => {
        if (response !== "") {
          toast(response, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
            theme: "dark",
          });
        }
        setAddressFieldInput((prev) => ({
          ...prev,
          search: "",
          house: "",
          society: "",
          area: "",
          errorSearch: "",
          errorHouse: "",
          errorSociety: "",
          errorArea: "",
        }));
        getAddressFunc();
        setAddNewAddressVal(false);
      });
  };
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: ["pk"] },
    },
    debounce: 1000,
    initOnMount: isLoaded ? true : false,
  });

  const handleCloseBtn = () => {
    setValue("");
    if (startingPopup) {
      dispatch(closeStartingPopup());
      const currentTime = new Date();
      localStorage.setItem("addressPopupCloseTime", currentTime.toString());
    } else {
      dispatch(closeAddressPopup());
    }
    if (addressData.addresses?.length > 0) {
      dispatch(showSelectedTab());
    } else {
      dispatch(addAddress());
    }
    setAddressBarClicked(false);
  };
  const handleCloseBtn2 = () => {
    dispatch(closeStartingPopup());
    const currentTime = new Date();
    localStorage.setItem("addressPopupCloseTime", currentTime.toString());
    setAddressBarClicked(false);
  };

  const handleAddNewAddress = () => {
    dispatch(setOpenStartingPopup());
    setValue("");
    setMapLoaded(false);
    if (!addNewAddressVal) {
      dispatch(closeAddressPopup());
      dispatch(showSelectedTab());
    } else {
      dispatch(addAddress());
    }
    setCurrentLocationBtnClicked(false);
  };

  const backBtn = () => {
    dispatch(showSelectedTab());
    getAddressFunc();
    setCurrentLocationBtnClicked(false);
  };

  useEffect(() => {
    getAddressFunc();
  }, [activeSelectedTab]);

  const [containerOffset, setContainerOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.deltaY >= 0) {
        setContainerOffset(eventData.deltaY);
      }
    },
    onSwiped: (eventData) => {
      if (Math.abs(eventData.deltaY) > 100) {
        handleCloseBtn2();
      } else {
        setContainerOffset(0);
      }
    },
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(${containerOffset}px)`;
    }
  }, [containerOffset]);

  useEffect(() => {
    const selectedAddressIDFromStorage =
      localStorage.getItem("selectedAddressID");
    if (getAddressData?.length > 0) {
      const savedAddressMatched = getAddressData.filter(
        (addresses) => addresses.ID === selectedAddressIDFromStorage
      );
      if (savedAddressMatched?.length === 0) {
        localStorage.setItem(
          "selectedAddressID",
          getAddressData[0]?.ID?.toString()
        );
        dispatch(SelectAddress({ addressID: Number(getAddressData[0]?.ID) }));
      }
      if (selectedAddressIDFromStorage === null) {
        localStorage.setItem(
          "selectedAddressID",
          getAddressData[0]?.ID?.toString()
        );
        dispatch(SelectAddress({ addressID: Number(getAddressData[0]?.ID) }));
      }
      if (addressData?.selectedAddressDetails === null) {
        localStorage.setItem(
          "selectedAddressID",
          getAddressData[0]?.ID?.toString()
        );
        dispatch(SelectAddress({ addressID: Number(getAddressData[0]?.ID) }));
      }
    }
  }, [openStartingPopup, addressBarClicked, getAddressData]);

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
      {openStartingPopup ? (
        <GlobalModal
          openSelector={openPopup}
          closeFunc={() => handleCloseBtn()}
          containerClass={`${style.addressModalContainer} addressModal`}
          contentClass={style.addressModalContent}
        >
          {activeSelectedTab ? (
            <>
              <Box className={style.gridBox}>
                <BoxTitle boxTitle="Select Address" />
                {getAddressData?.length > 0 ? (
                  getAddressData.map((data, index) => (
                    <SelectedAddress
                      isStartingAddressActive={false}
                      getAddressFunc={getAddressFunc}
                      data={data}
                      id={getAddressData?.length}
                      key={index}
                    />
                  ))
                ) : getAddressData?.length === 0 ? null : (
                  <SectionLoader />
                )}
              </Box>
              <Box className={style.gridBox2}>
                <Buttons
                  btnClickFunction={handleAddNewAddress}
                  btnClass="primary btn-half-rounded"
                >
                  {addNewAddressVal ? getText("Add-New-Address") : "Continue"}
                </Buttons>
              </Box>
            </>
          ) : (
            <>
              <MapWrapper
                getAddressData={getAddressData}
                backBtn={backBtn}
                setCurrentLocationBtnClicked={setCurrentLocationBtnClicked}
                currentLocationBtnClicked={currentLocationBtnClicked}
                setMapLoaded={setMapLoaded}
                mapLoaded={mapLoaded}
                status={status}
                ready={ready}
                setAddressFieldInput={setAddressFieldInput}
                addressFieldInput={addressFieldInput}
                value={value}
                setValue={setValue}
                data={data}
                clearSuggestions={clearSuggestions}
                mapRef={mapRefState}
                handleSetMapRefState={handleSetMapRefState}
                handleCurrentLocationClick={handleCurrentLocationClick}
                setMapIsDragging={setMapIsDragging}
                mapIsDragging={mapIsDragging}
                handleSaveAddress={handleSaveAddress}
                isLoaded={isLoaded}
              />
            </>
          )}
        </GlobalModal>
      ) : (
        <GlobalModal
          openSelector={startingPopup}
          closeFunc={() => handleCloseBtn2()}
          containerClass={`${style.addressModalContainer} ${style.addressStartPopupContainer} addressModal`}
          contentClass={style.addressModalContent}
          modalBoxClass={style.modelBoxClass}
          modalHeadClass={style.modalHeadClass}
          closeBtnClass={style.closeBtnOnModal}
        >
          {activeSelectedTab ? (
            <>
              <div className={style.addressBoxWrapper} ref={containerRef}>
                <Box className={style.gridBox}>
                  <div {...handlers} className={style.headingWrapper}>
                    {windowWidth < 575 ? (
                      <LocationIcon color={"--primary-color-darker"} />
                    ) : null}
                    <BoxTitle
                      classes={style.heading}
                      boxTitle="Select Address"
                    />
                  </div>
                  <Box className={style.addressesContainer}>
                    {getAddressData?.length > 0 ? (
                      getAddressData.map((data, index) => (
                        <SelectedAddress
                          isStartingAddressActive={
                            windowWidth < 575 ? true : false
                          }
                          getAddressFunc={getAddressFunc}
                          data={data}
                          id={getAddressData?.length}
                          key={index}
                        />
                      ))
                    ) : getAddressData?.length === 0 ? null : (
                      <SectionLoader />
                    )}
                  </Box>
                </Box>
                <Box className={style.addNewAddressBtnContainer}>
                  <LocationIcon color={"--primary-color-darker"} />
                  <Buttons
                    btnClickFunction={handleAddNewAddress}
                    btnClass={style.addNewAddressBtn}
                  >
                    {" "}
                    {getText("Add-new-address")}
                  </Buttons>
                </Box>
                <Box className={style.gridBox2}>
                  <Buttons
                    btnClickFunction={handleCloseBtn2}
                    btnClass="primary btn-half-rounded"
                  >
                    Continue
                  </Buttons>
                </Box>
              </div>
            </>
          ) : (
            ""
          )}
        </GlobalModal>
      )}

      <CartRemoveModal />
    </>
  );
};

export default StartAddressModal;
