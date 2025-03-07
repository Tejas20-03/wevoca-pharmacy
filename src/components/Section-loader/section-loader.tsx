import React from 'react';
import PageLoader from '@/components/Global-Icon/Page-loader';
import style from './section-loader.module.scss';

interface IProps { }

const SectionLoader: React.FC<IProps> = () => {
    return (
        <div className={style.SectionLoader}><PageLoader color={'--primary-color'} /></div>
    );
};

export default SectionLoader;
