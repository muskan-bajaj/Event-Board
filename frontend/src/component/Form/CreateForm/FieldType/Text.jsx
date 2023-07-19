import React from 'react'

export default function Text(props) {

  return (
    <div>
        <input type="text" 
        onChange={(e)=>{
          props.setUserData({...props.userData, [`${props.fieldName}`]:e.target.value}
          )}} 
        value={props.setUserData[props.fieldName]}/>
    </div>
  )
}
