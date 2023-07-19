import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../Context/Context'

import './Fields.css'

export default function Fields(props) {
    const [fieldName,setFieldName]=useState('')
    const [fieldType,setFieldType]=useState('')
    const [mandate,setMandate]=useState('')
    const [value,setValue]=useState('DONE')
    const [disable,setDisable]=useState('')

    const authContextValue=useContext(AuthContext)

    const doneHandler=async(e)=>{
        const fields=authContextValue.fields
        if(value==="DONE"){
            // console.log("done clicked!!!!!!!")
            const fieldDetails={fieldName,fieldType,mandate}
            // console.log(fieldDetails)
            authContextValue.setFields(prevState => [...prevState, fieldDetails])
            setValue("EDIT")
            console.log(fields)
            setDisable('disabled')
        }
        else{
            console.log("edit clicked!!!!!!!")
            setValue("DONE")
            setDisable("")
        }
        // console.log(props.fieldDisable)

        // if(disable==="disabled" && props.createForm==="clicked"){
        //     setDisable("")
        //     setFieldName("")
        //     setFieldType("")
        //     setMandate("")
        // }
    }
  return (
    <div className='registrationField'>
        <div className='flex'>
            <div className="fieldName">
                <label htmlFor="fname" className='FN'>Field Name:</label>
                <input type="text" id='fname'  onChange={(e)=>setFieldName(e.target.value)} value={fieldName} disabled={disable}/>
            </div>
            <div className="fieldDataType">
                <label htmlFor="fDataType" className='FDT'>Field Data Type:</label>
                <select name="dataType" id="fDataType"  onChange={(e)=>setFieldType(e.target.value)} value={fieldType} disabled={disable}>
                    <option value="">Select data type</option>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="file">File</option>
                    <option value="radio">Radio</option>
                    <option value="date">Date</option>
                </select>
            </div>
            <div className="fieldMandate">
                <input type="checkbox" id='fmandate' onChange={(e)=>setMandate(e.target.checked)} value={mandate} disabled={disable}/>
                <label htmlFor="fmandate" className='FM'>* Field is mandatory</label>
            </div>
        </div>
        <div>
            <div className="done" onClick={doneHandler}>{value}</div>
        </div>
    </div>
  )
}
