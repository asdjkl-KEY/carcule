import React from 'react';

import './Alert.css';

const Alert = ({ message, type }) => {
    return (
        <div className='alert-container'>
            <div className={`alert alert-type-${type??'danger'}`}>
                <strong className={`alert-message alert-message-${type??'danger'}`}>
                    {message??'Error'}
                </strong>
            </div>
        </div>
    )
}

export default Alert