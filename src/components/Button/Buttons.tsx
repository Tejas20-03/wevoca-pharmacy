import React, { MouseEventHandler } from 'react'

interface IProps {
    children?: React.ReactNode,
    btnClass?: string,
    types?: 'submit' | 'reset' | 'button';
    btnClickFunction?: MouseEventHandler<HTMLButtonElement>;

}

const Buttons: React.FC<IProps> = ({ children, btnClass, types = 'button', btnClickFunction, ...rest }) => {
    const myClass = `btn ${btnClass}`;
    return (
        <button type={types} className={myClass} onClick={btnClickFunction} {...rest}>{children}</button>
    )
}

export default Buttons
