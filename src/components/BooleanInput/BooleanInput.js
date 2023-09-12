import React from 'react';
import './BooleanInput.css';

const BooleanInput = ({func, value, dft, name}) => {
    return (
        <label className="switch" onClick={func}>
            {dft && <input type="checkbox" name={name??'default'} defaultChecked={value} id="themeToggle"/>}
            {!dft && <input type="checkbox" name={name??'default'} checked={value} id="themeToggle"/>}
            <span className="slider"></span>
        </label>
    )
}

export default BooleanInput;