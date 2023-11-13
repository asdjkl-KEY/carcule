import React, { useState } from 'react';
import './Modal.css';
import { Theme } from '../../configs/settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../Button/Button';

const Modal = ({modalId, content}) => {
    const [showModal, setShowModal] = useState(false);

    function closeModal(){
        setShowModal(false);
        let m = document.getElementById(modalId);
        m.classList.remove('show-true');
        m.classList.add('show-false');
    }

    return (
        <div id={modalId} className={`modal-container show-${showModal} theme-${Theme}`}>
            <div className='modal-close'>
                <Button 
                    color={'red'}
                    text={<FontAwesomeIcon icon="close"/>}
                    orient={'center'}
                    size={'large'}
                    onClick={() => closeModal()}
                />
            </div>
            <div className='modal-content'>
                <content/>
            </div>
        </div>
    )
}

export default Modal;