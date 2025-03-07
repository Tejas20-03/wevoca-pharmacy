import Link from 'next/link';
import React from 'react'

interface IProps {
    children?: React.ReactNode,
    btnClass?: string,
    link?: string | null | undefined,
}

const LinkButton: React.FC<IProps> = ({ children, btnClass, link, ...rest }) => {
    const myClass = `btn ${btnClass}`;
    return (
        <Link href={{ pathname: link }} className={myClass} {...rest} prefetch={false}>{children}</Link>
    )
}

export default LinkButton
