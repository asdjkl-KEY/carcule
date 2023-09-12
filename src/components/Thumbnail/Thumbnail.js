import React from "react";

import './Thumbnail.css';

const Thumbnail = ({size, dynamic, scaleOnHover,Alt,path}) => {
    return (
        <div className={`thumbnail-container tmb-container-size-${size??'default'}`}>
            <img
                alt={Alt??'Icon'}
                src={path}
                className={`tmb-size-${size??'default'} tmb-dynamic-${dynamic?'on':'off'} tmb-scale-${scaleOnHover?'on':'off'}`}
            />
        </div>
    )
}

export default Thumbnail;