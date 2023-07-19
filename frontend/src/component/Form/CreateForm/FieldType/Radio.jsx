import React from 'react'

export default function Radio(props) {
  return (
    <div>
        <input type='radio'
        onChange={(e)=>{
          props.setUserData({...props.userData, [`${props.fieldName}`]:e.target.value}
          )}} 
        value={props.setUserData[props.fieldName]}/>
    </div>
  )
}
