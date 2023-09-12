import React from 'react';
import { Theme } from '../../configs/settings';
import { t } from '../../configs/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Loading.css';

const Loading = ({ message, type }) => {
    return (
        <div className={`loading-container theme-${Theme}`}>
            <h1>{t('loading.carculando')}</h1>
            <FontAwesomeIcon className='loading-icon'
                icon="spinner"
            />
        </div>
    )
}

export default Loading