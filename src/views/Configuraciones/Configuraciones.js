import React, { useState } from 'react'
import './Configuraciones.css';
import { Theme } from '../../configs/settings';
import { t } from '../../configs/lang';

import BooleanInput from '../../components/BooleanInput/BooleanInput';

const boolean_configs = [
    'allow_animations'
]
const select_configs = [
    'default_language',
    'theme'
]

const Configuraciones = () => {
    let [changes, setChanges] = useState({});

    function handleChange(e) {
        let { name, checked } = e.target;
        changes[name] = checked===true?'true':'false';
    }

    return (
        <div className={`config-container theme-${Theme}`}>
            <h1>{t('configuracoes.title')}</h1>
            <div className='config-grid'>
                <div id='boolean-settings'>
                    {boolean_configs.map((config, index) => {
                        return (
                            <div className='boolean-config-item'>
                                <h3>{t(`configuracoes.${config}`)}</h3>
                                <BooleanInput
                                    dft={true}
                                    value={localStorage.getItem(config) === 'true'}
                                    func={handleChange}
                                    name={config}
                                />
                            </div>
                        )
                    })}
                </div>
                <div id='select-settings'></div>
                <div id='input-settings'></div>
            </div>
        </div>
    )
}

export default Configuraciones;