import React, { useState } from 'react';
import './SideBarMenu.css';
import { t } from '../../configs/lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Theme } from '../../configs/settings';

const SideBarMenu = ({items, func: handleSet, open}) => {
    if(!localStorage.getItem('sidebarmenu.selected')) localStorage.setItem('sidebarmenu.selected', 'profile');
    let [selected, setSelected] = useState(localStorage.getItem('sidebarmenu.selected'));

    function handleSelect(e) {
        setSelected(e.target.id);
        localStorage.setItem('sidebarmenu.selected', e.target.id);
        handleSet(e);
    }

    return (
        <div className={`animate menu-container menu-theme-${Theme??'light'} menu-${open?'open':'closed'}`}>
            <ul className={`menu-list`}>
                {items.map((item, index) => {
                    return (
                        <li onClick={handleSelect} key={index} className={`${selected===item.label?'menu-item-'+(Theme??'dark')+'-selected ':''}animate menu-item menu-item-theme-${Theme??'dark'}`} id={item.label} title={t(`menu.${item.label}`)}>
                            <FontAwesomeIcon icon={item.icon} className='menu-icon' /> <span className='show-on-toggle'>{t(`menu.${item.label}`)}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SideBarMenu;