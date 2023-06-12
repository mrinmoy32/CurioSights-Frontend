import React from 'react'

function PlaceItem() {
  return (
    <li className='place-item'>
      <div className='place-item__image'>
        <img src={props.image}  />
      </div>
    </li>
  )
}

export default PlaceItem