import React from 'react'

export default function File(props) {
  return (
    <div>
        <input type='file'
        onChange={(e)=>{
          props.setUserData({...props.userData, [`${props.fieldName}`]:e.target.value}
          )}} 
        value={props.setUserData[props.fieldName]}/>
    </div>
  )
}
