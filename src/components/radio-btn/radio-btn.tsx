import { Box } from '@mui/material';
import { Field, Form } from 'formik';
import React from 'react';
import style from './radio-btn.module.scss';

import { paymentRadioObjProp } from '@/containers/cart/cart-index/Cart-index';

interface IProps {
    cateogryOption: { key: string, value: string, isDefault?: boolean }[];
    classes?: string;
    name: string;
    setSelectedOptionVal: React.Dispatch<React.SetStateAction<{ key: string; value: string; isDefault: boolean; } | { key: string; value: string; isDefault?: undefined; }>>,

    selectedOptionVal: paymentRadioObjProp | []
    isVariationAvaiable?: boolean;
}

const RadioBtn: React.FC<IProps> = ({ cateogryOption, classes, name, selectedOptionVal, setSelectedOptionVal, isVariationAvaiable = false }) => {
    const radioGroupClass = `${style.RadioGroup} ${classes?.length ? classes : ''}`;
    return (
        <Form>
            <Box className={radioGroupClass}>
                {cateogryOption.map((option, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className={`${style.RadioBtn} ${isVariationAvaiable ? style.RadioBlured : ''}`}>
                                <Field
                                    type="radio"
                                    name={name}

                                    id={option?.value}
                                    className={option?.value && `radio-btn${option?.value}`}
                                    value={option?.value}
                                    onChange={() => !isVariationAvaiable ? setSelectedOptionVal(option) : {}}
                                    checked={selectedOptionVal?.value === option?.value}
                                />
                                <span className={style.customRadio}></span>
                                <label htmlFor={option?.value}>
                                    {option?.key}
                                </label>
                            </div>
                        </React.Fragment>
                    )
                })}
            </Box>
        </Form>
    );
};

export default RadioBtn;
