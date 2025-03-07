import React from 'react';
import Image from 'next/image';
import style from '@/components/Address/Address.module.scss';


const AddressIcon = () => {
    return (
        <Image width={13} height={19} src='/assets/address-icon.svg' alt="location icon" className={style.path} />
    )
}

export default AddressIcon