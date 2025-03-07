import AddressModal from '@/components/Address/Modal/Address-modal';
import LoginModal from '@/components/Login/Modal/Login-modal';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { addAddress } from '@/redux/address-popup/slice';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar-menu/Sidebar';
import HeaderMobile from './header-mobile/header-mobile';
import HeaderDesktop from './header-desktop/header-desktop';
import { GetCategoryMenu_ResponseType } from '@/services/categories/types';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/dataFetching/apiResponseQueryKey';
import { headerCategoryMenu } from '@/dataFetching/apiResponseFetching';
import { useRouter } from 'next/router';

interface IProps {
  categoryMenuResponse?: GetCategoryMenu_ResponseType[];
}

const HeaderIndex: React.FC<IProps> = () => {
  const { data: categoryMenuResponse } = useQuery({ queryKey: [QUERY_KEYS.HEADER_CATEGORY], queryFn: headerCategoryMenu, staleTime: Infinity });
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.addresses);
  const [addNewAddressVal, setAddNewAddressVal] = useState<boolean>(true);
  const [addressBarClicked, setAddressBarClicked] = useState<boolean>(false);
  const { openPopup } = useAppSelector((state) => state.AddressPopup);
  const { popup: loginPopup } = useAppSelector((state) => state.LoginPopup);
  if (address.addresses?.length === 0) dispatch(addAddress());
  const windowSize = useWindowSize();
  const isMobile = windowSize.width && windowSize.width < 576;
  return (
    <>
      {isMobile ? <Sidebar /> : ''}
      <HeaderDesktop setAddressBarClicked={setAddressBarClicked} setAddNewAddressVal={setAddNewAddressVal} categoryMenuResponse={categoryMenuResponse} windowWidth={windowSize.width} />
      <HeaderMobile setAddressBarClicked={setAddressBarClicked} setAddNewAddressVal={setAddNewAddressVal} windowWidth={windowSize.width} />

      {openPopup && <AddressModal addressBarClicked={addressBarClicked} setAddressBarClicked={setAddressBarClicked} setAddNewAddressVal={setAddNewAddressVal} addNewAddressVal={addNewAddressVal} />}
      {loginPopup && <LoginModal />}
    </>
  );
};

export default HeaderIndex;
