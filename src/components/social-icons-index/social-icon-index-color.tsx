import React from 'react';
import FacebookIcon from '@/components/Global-Icon/Facebook-icon';
import InstagramIcon from '@/components/Global-Icon/Instagram-icon';
import TwitterIcon from '@/components/Global-Icon/Twitter-icon';
import YoutubeIcon from '@/components/Global-Icon/Youtube-icon';
import style from './social-icon-index.module.scss';
import Link from 'next/link';
import FacebookIconColored from '../Global-Icon/Facebook-icon-colored';
import TwitterIconColored from '../Global-Icon/Twitter-icon-colored';
import InstagramIconColored from '../Global-Icon/Instagram-icon-colored';
import YoutubeIconColord from '../Global-Icon/Youtube-icon-colored';

interface IProps {
    classes?: string;
    iconColor?: string;
}

const SocialIconIndexColored: React.FC<IProps> = ({ classes, iconColor = '--text-color-alt' }) => {
    const socialClass = `${style.globalStyle} ${classes?.length && classes}`;
    return (
        <ul className={socialClass}>
            <li className='Facebook'><Link target="_blank" rel="noreferrer" href="/"><FacebookIconColored color={iconColor} /></Link></li>
            <li className='Twitter'><Link target="_blank" rel="noreferrer" href="/"><TwitterIconColored color={iconColor} /></Link></li>
            <li className='Instagram'><Link target="_blank" rel="noreferrer" href="/"><InstagramIconColored color={iconColor} /></Link></li>
            <li className='Youtube'><Link target="_blank" rel="noreferrer" href="/"><YoutubeIconColord color={iconColor} /></Link></li>
        </ul>
    );
};

export default SocialIconIndexColored;
