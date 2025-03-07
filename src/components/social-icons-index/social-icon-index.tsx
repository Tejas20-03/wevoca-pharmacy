import React from 'react';
import FacebookIcon from '@/components/Global-Icon/Facebook-icon';
import InstagramIcon from '@/components/Global-Icon/Instagram-icon';
import TwitterIcon from '@/components/Global-Icon/Twitter-icon';
import YoutubeIcon from '@/components/Global-Icon/Youtube-icon';
import style from './social-icon-index.module.scss';
import Link from 'next/link';

interface IProps {
    classes?: string;
    iconColor?: string;
}

const SocialIconIndex: React.FC<IProps> = ({ classes, iconColor = '--primary-color' }) => {
    const socialClass = `${style.globalStyle} ${classes?.length && classes}`;
    return (
        <ul className={socialClass}>
            <li className='Facebook'><Link target="_blank" rel="noreferrer" href="/"><FacebookIcon color={iconColor} /></Link></li>
            <li className='Twitter'><Link target="_blank" rel="noreferrer" href="/"><TwitterIcon color={iconColor} /></Link></li>
            <li className='Instagram'><Link target="_blank" rel="noreferrer" href="/"><InstagramIcon color={iconColor} /></Link></li>
            <li className='Youtube'><Link target="_blank" rel="noreferrer" href="/"><YoutubeIcon color={iconColor} /></Link></li>
        </ul>
    );
};

export default SocialIconIndex;
