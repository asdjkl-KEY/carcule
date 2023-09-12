import React from 'react';
import './FormSelectGroup.css';
import { Theme } from '../../configs/settings';

const FormSelectGroup = ({label, options, func}) => {
    function handleChange(){
        console.log("change"); //TODO: add function
    }
    return (
        <div className={`form-select-group-container form-select-group-container-theme-${Theme}`}>
            <label>{label}</label>
            <select onChange={handleChange}>
                {options.map(option => {
                    return (
                        <option className={`form-select-option-theme-${Theme}`} value={option.value}>
                            {option.name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default FormSelectGroup;