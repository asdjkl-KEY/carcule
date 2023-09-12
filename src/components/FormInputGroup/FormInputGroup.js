import React from 'react';
import './FormInputGroup.css';
import { AllowAnimations } from '../../configs/settings'

const FormInputGroup = ({ label, type, name, value, onChange, error, inputStyle,labelOrient }) => {
    return (
        <div className="form-input-group">
            {error && <div className="alert alert-danger">{error}</div>}
            <label className={`label-${labelOrient??'default'}`} htmlFor={name}>{label}</label>
            <input type={type} className={`${AllowAnimations?'animate':''} form-input form-input-style-${inputStyle??'light'}`} id={name} name={name} defaultValue={value} onChange={onChange} />
        </div>
    )
}

export default FormInputGroup;