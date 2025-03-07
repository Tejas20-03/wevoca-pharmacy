import React from 'react';
import SocialIconIndex from '@/components/social-icons-index/social-icon-index';
import styles from './Banner-social-icon.module.scss';

interface IProps {
    classes?: string;
}

const BannerSocialIcon: React.FC<IProps> = ({ classes }) => {
    const additionalClass = `${styles.socialIcon} ${classes?.length && classes}`
    return (
        <SocialIconIndex classes={additionalClass} iconColor="--fill-color" />
    );
};

export default BannerSocialIcon;
