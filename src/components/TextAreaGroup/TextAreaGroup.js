import React from 'react';
import { Theme } from '../../configs/settings';
import './TextAreaGroup.css';

const TextAreaGroup = ({id, label, value, func, placeHolder, readOnly, type}) => {
    return (
        <div className={`textarea-container theme-${Theme}`}>
            <label className='textarea-label' htmlFor={id}>{label}</label>
            <textarea className={`textarea text-type-${type??'normal'}`} readOnly={readOnly} placeholder={placeHolder} id={id} name={id} onChange={(e) => { if(func){ func(e) } }} >

            </textarea>
        </div>
    )
}

export default TextAreaGroup;