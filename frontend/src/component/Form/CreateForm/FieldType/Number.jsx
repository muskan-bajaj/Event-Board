import React from 'react'

export default function Number(props) {
  return (
    <div>
        <input type='number'
        onChange={(e)=>{
          props.setUserData({...props.userData, [`${props.fieldName}`]:e.target.value}
          )}} 
        value={props.setUserData[props.fieldName]}/>
    </div>
  )
}
