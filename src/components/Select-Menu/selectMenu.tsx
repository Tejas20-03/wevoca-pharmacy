import React from 'react';
import Select, { components, OptionProps, SingleValueProps } from 'react-select';
import DownArrow from '@/components/Global-Icon/down-arrow';
import Image from 'next/image';

interface OptionType {
    value: string
    label: string
}


type ObjectProp = {
    option: Array<OptionType>,
    placeholder: string,
    id: string,
    name: string
    customIcon?: string,
}

const SelectMenu: React.FC<ObjectProp> = ({ option, placeholder, id, name, customIcon }) => {
    const { Option } = components
    const CustomSelectOption = (props: OptionProps<OptionType>) => (
        <Option {...props}>
            {customIcon?.length === 0 || customIcon === undefined &&
                <>
                    {props.isSelected ?
                        <div><Image fill src='/assets/selected-option-img.svg' alt="radio icon" style={{ marginRight: '5px' }} /></div>
                        :
                        <div><Image fill src='/assets/unselected-option-img.svg' alt="radio icon" style={{ marginRight: '5px' }} /></div>
                    }
                </>
            }
            {customIcon?.length && <div><Image fill src={customIcon} alt="radio icon" style={{ marginRight: '5px' }} /></div>}
            {props.children}
        </Option>
    );
    const CustomSelectValue = (props: SingleValueProps<OptionType>) => (
        <div className='selectedItem'>
            {props.data.label}
        </div>
    )

    return (
        <>
            <Select
                id={id}
                name={name}
                options={option}
                className="fancy_select"
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                    SingleValue: CustomSelectValue,
                    Option: CustomSelectOption,
                }}
                classNamePrefix="react-select__option123"
                placeholder={placeholder}
                isSearchable={false}
            />
            <DownArrow />
        </>
    );
};

export default SelectMenu;
