import React, { useState } from 'react';
import './Toggle.css';
import { Theme } from '../../configs/settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Toggle = ({func}) => {
    let [open, setOpen] = useState(false);
    function openToggle(){
        let v = !open;
        setOpen(!open);
        func(v)
    }
    return (
        <div onClick={openToggle} className={`toggle toggle-theme-${Theme??'dark'}`}>
            <FontAwesomeIcon className={`animate toggle-close-${open?'active':'inactive'}`} icon='close' color={Theme==='dark'?'#444':'#333'} />
            <FontAwesomeIcon className={`animate toggle-bars-${open?'inactive':'active'}`} icon='bars' color={Theme==='dark'?'#444':'#333'} />
        </div>
    )
}

export default Toggle;