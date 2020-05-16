import React from 'react';
import './Tile.css';

const Tile = (props) => {
  return(
    <div className={`field__item_wrapper ${props.status}`} onClick={() => props.onClick(props.id)} >
      <div
        className={`field__item back`}
        style={{backgroundImage: `url(${props.img})`}}
        >
      </div>
      <div className='field__item front'>
      </div>
    </div>
  )
};

export default Tile;