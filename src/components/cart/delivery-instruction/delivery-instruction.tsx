
import React from 'react';
import CartBoxContainer from '@/components/cart/cart-box-container/cart-box-container';
import style from './delivery-instruction.module.scss';
import { useLanguage } from '@/language-context/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { GetTranslatedData } from '@/services/footer/services';
import Cookies from 'js-cookie';

interface IProps {
    setDeliveryInstructionVal: React.Dispatch<React.SetStateAction<string>>;
    deliveryInstructionVal: string,
}

const DeliveryInstruction: React.FC<IProps> = ({ setDeliveryInstructionVal, deliveryInstructionVal }) => {
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
        <CartBoxContainer boxTitle={getText('Delivery-Instruction')}>
            <input className={style.deliveryInstructions} value={deliveryInstructionVal} onChange={(e) => setDeliveryInstructionVal(e.target.value)} id="deliveryInstruction" name="deliveryInstruction" placeholder={getText("Write-Here")} />
        </CartBoxContainer>
    );
};

export default DeliveryInstruction;
