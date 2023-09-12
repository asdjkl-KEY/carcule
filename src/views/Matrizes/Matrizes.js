import React from 'react';
import './Matrizes.css';
import { t } from '../../configs/lang';
import { Theme } from '../../configs/settings';

const Matrizes = () => {
    return (
        <div className={`matrizes-container theme-${Theme??'light'}`}>
            <h1>{t('proximamente')}</h1>
        </div>
    )
}

export default Matrizes;