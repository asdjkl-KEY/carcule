import React from 'react';
import './Button.css';
import { AllowAnimations } from '../../configs/settings';

const Button = ({ color, text, onClick, size, orient }) => {
    return (
        <div className={`button-container btn-orient-${orient??'default'}`}>
            <button
                className={`${AllowAnimations?'animate':''} btn btn-${color} btn-${size}`}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    )
}

export default Button;