import React from 'react'


const TextError = (props: { children: React.ReactNode }) => {
    return (
        <span className='custom-form-error'>
            {props.children}
        </span>
    )
}

export default TextError