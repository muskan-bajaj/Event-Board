import React from 'react'

export default function Checkbox(props) {
  return (
    <div>
        <input type='checkbox'
        onChange={(e)=>{
          props.setUserData({...props.userData, [`${props.fieldName}`]:e.target.value}
          )}} 
        value={props.setUserData[props.fieldName]}/>
    </div>
  )
}
