import React, { useEffect, useState } from 'react'
import Text from "../FieldType/Text"
import Checkbox from "../FieldType/Checkbox"
import Date from "../FieldType/Date"
import File from "../FieldType/File"
import Number from "../FieldType/Number"
import Radio from "../FieldType/Radio"

export default function FetchFields(props) {

  return (
    <div className='viewFieldNameType'>
      {props.event.mandate===true?
      <div className="viewFieldName">
        {props.event.fieldName}*
      </div>
      :
      <div className="viewFieldName">
        {props.event.fieldName}
      </div>}
      
      {(props.event.fieldType==="text")?
      <div className='viewFieldType'>
        <Text fieldName={props.event.fieldName} setUserData={props.setUserData} userData={props.userData}/>
      </div>
      :
      <>
      </>}
      {props.event.fieldType==="checkbox"?
      <div className='viewFieldType'>
        <Checkbox fieldName={props.event.fieldName} setUserData={props.setUserData} userData={props.userData}/>
      </div>
      :
      <>
      </>}
      {props.event.fieldType==="date"?
      <div className='viewFieldType'>
        <Date fieldName={props.event.fieldName} setUserData={props.setUserData} userData={props.userData}/>
      </div>
      :
      <>
      </>}
      {props.event.fieldType==="file"?
      <div className='viewFieldType'>
        <File fieldName={props.event.fieldName} setUserData={props.setUserData} userData={props.userData}/>
      </div>
      :
      <>
      </>}
      {(props.event.fieldType==="number")?
      <div className='viewFieldType'>
        <Number fieldName={props.event.fieldName} setUserData={props.setUserData} userData={props.userData}/>
      </div>
      :
      <>
      </>}
      {props.event.fieldType==="radio"?
      <div className='viewFieldType'>
        <Radio fieldName={props.event.fieldName} setUserData={props.setUserData} userData={props.userData}/>
      </div>
      :
      <>
      </>}
    </div>
    // Name: {props.event.fieldName} Type: {props.event.fieldType} Mandate: {props.event.mandate}
  )
}
