import { Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import OtpField from 'react-otp-field';
import style from './login-otp-card.module.scss';
import FormStyle from '@/components/Login/FormField.module.scss';
import { postCheckVerificationCode, postCustomerLogin } from '@/services/user/services';
import { changeLoginScreen, closeLoginPopup, openLoginPopupOnAddToCart } from '@/redux/Login-popup/slice';
import { formFields } from '@/components/Login/Modal/Login-modal';
import { useDispatch } from 'react-redux';
import { StoreDispatch } from '@/redux/store';
import { setUserDataAndSaveInLocalStorage } from '@/redux/user/actions';
import ArrowLeft from '@/containers/svg-icons/arrow-left';

import { SetCustomerTokenInLocalStorage } from '@/functions/local-storage-methods';
import { useAppSelector } from '@/hooks/use-app-selector';
import { openAddressPopup } from '@/redux/address-popup/slice';
import { setAddressesAfterUserLogin } from '@/redux/addresses/actions';
import { useLanguage } from '@/language-context/LanguageContext';
import Cookies from 'js-cookie';
import { GetTranslatedData } from '@/services/footer/services';
import { useQuery } from '@tanstack/react-query';

interface IProps {

    initialValue: formFields;
    setInitialValue: React.Dispatch<React.SetStateAction<formFields>>;
}

const ResendOtpWaitTime = 60;

const LoginOtpCard: React.FC<IProps> = ({ initialValue, setInitialValue }) => {
    const dispatch = useDispatch<StoreDispatch>();

    const [resendOtpTimer, setResendOtpTimer] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [OTP, setOTP] = useState("");
    const [otpError, setOtpError] = useState('');
    const [submitOtp, setSubmitOtp] = useState<boolean>(false);

    const { isAddToCartClicked } = useAppSelector((state) => state.LoginPopup);
    const addressesData = useAppSelector((state) => state.addresses);

    const phoneNumber2 = initialValue.phonenumber.slice(0, 2) === '00' ? initialValue.phonenumber.slice(2) : initialValue.phonenumber.slice(0, 1) === '0' ? initialValue.phonenumber.slice(1) : initialValue.phonenumber;

    const handleResendCode = async () => {
        if (resendOtpTimer > 0) return;
        setIsProcessing(true);
        setResendOtpTimer(ResendOtpWaitTime);
        const response = await postCustomerLogin(initialValue.name, `${initialValue.phonenumber}`, initialValue.email, { token: '' });
        if (response && response.responseType.toString() === '1') setIsProcessing(false);
    };
    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (resendOtpTimer > 0) interval = setInterval(() => setResendOtpTimer(prev => prev - 1), 1000);

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [resendOtpTimer]);

    useMemo(async () => {
        if (OTP.length === 4) {
            setIsProcessing(true);
            const response = await postCheckVerificationCode(initialValue.name, `${initialValue.phonenumber}`, OTP, { token: '' });
            if (response && response.responseType.toString() === '1') {
                if (response?.CustomerToken !== '') {
                    SetCustomerTokenInLocalStorage(response.CustomerToken)
                    dispatch(setUserDataAndSaveInLocalStorage({ userData: { isLoggedIn: true, userID: response.CustomerID, phoneNum: `${initialValue.phonenumber}`, userName: initialValue.name, email: initialValue.email, authToken: response?.CustomerToken } }));
                    dispatch(closeLoginPopup())
                    if (typeof window !== 'undefined') {
                        // window.webengage?.user?.login('9SBOkLVMWvPX');
                        // window.webengage?.user?.setAttribute('we_first_name', `${initialValue.name}`);
                        // window.webengage?.user?.setAttribute('we_phone', `${initialValue.phonenumber}`);
                        // window.webengage?.user?.setAttribute('we_email', `${initialValue.email}`);
                    }   
                    setOtpError('');
                    setTimeout(async () => {
                        if (isAddToCartClicked && addressesData.selectedAddressID === null) {
                            dispatch(openAddressPopup());
                            dispatch(openLoginPopupOnAddToCart(true));
                        }
                        await dispatch(setAddressesAfterUserLogin({}));
                    }, 500)
                }
            } else if (response && response.responseType.toString() === '0') setOtpError(response.Message);
            setOtpError('OTP code is not valid.');

            setIsProcessing(false);
        } else {

        }
    }, [OTP, submitOtp])

    useEffect(() => {
        setOtpError('');
    }, [])


    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setSubmitOtp(pre => pre = !pre)
    }

    const loginBackBtn = () => {
        dispatch(changeLoginScreen(false))
        setInitialValue({
            name: '',
            phonenumber: '',
            email: ''
        })
    }

    const { isLoading, error, data, refetch } = useQuery(
        ["login-otp"],
        async () => {
          return await GetTranslatedData({ token: "" });
        },
        {
          retry: (failureCount, error) => {
            const token = Cookies.get("auth-token");
            return !token;
          },
          retryDelay: 0,
          staleTime: 600000, //1 day
        }
      );
    
      const translatedData = data?.Data || [];
    
      const { language } = useLanguage();
    
      const getText = (value: string) => {
        const item = translatedData.find((item: string) => item.Value === value);
        return language === "ar" ? item?.Arabic : item?.English;
      };

    return (
        <>
            <button className={style.backBtn} onClick={() => loginBackBtn()}><ArrowLeft /></button>
            <Typography id="modal-modal-title" variant="h4" component="h1">
                {getText("Hey-There")}
            </Typography>
            <Typography className={style.modalDescription} sx={{ mt: 2 }}>Enter the OTP sent to - <span>+92-{phoneNumber2}</span></Typography>
            <form className={FormStyle.Form} onSubmit={handleSubmit}>
                <OtpField
                    numInputs={4}
                    value={OTP}
                    isTypeNumber={true}
                    autoFocus
                    onChange={setOTP}
                    classNames={style.otpfield}

                    onChangeRegex={/^[0-9]*$/}
                    inputProps={{
                        id: 'myOtpInput',
                        className: `${style.otpfield__input} myOtpInput`,
                        inputMode: 'numeric',
                        pattern: `^[0-9]*$/`
                    }}
                />
                {otpError.length > 0 && <p className={style.errorText} >{otpError}</p>}
                <Typography className={style.counterCount} >
                    {`${resendOtpTimer ? `00:${resendOtpTimer}` : ""}`}
                </Typography>

                <p>Didn’t receive Code? <button type="button" onClick={handleResendCode} className={resendOtpTimer > 0 ? style.ResendDisabled : ''}>Re-send</button></p>
                {!isProcessing ? <button type='submit'>Submit</button> : <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()} type='submit' className={style.submitLoading}>loading</button>}
            </form>
        </>
    );
};

export default LoginOtpCard;
