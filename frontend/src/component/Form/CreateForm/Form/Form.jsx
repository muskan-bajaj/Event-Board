import React, { useEffect, useState,useContext } from 'react'
import { AuthContext } from '../../../Context/Context'
import Fields from '../Fields/Fields'
import ViewForm from '../../../ViewForm/ViewForm'

import './Form.css'
// import PreviousForm from '../../../PreviousForm/PreviousForm'

export default function Form() {
    const [fieldNo,setFieldNo]=useState([[1]]);
    const [formName,setFormName]=useState('')
    const [formDes,setFormDes]=useState('')
    const [error,setError]=useState(null)

    const [modal,setModal]=useState('modalInactive')

    const authContextValue=useContext(AuthContext)
    let fields = authContextValue.fields
    const noticeArray=authContextValue.notices

    var noticeID

    const handleAddField=async()=>{
        setFieldNo(prevState => [...prevState, [1]])
    }

    useEffect(() => {
        console.log(fieldNo);
    }, [fieldNo]);

    const sumbitFunction=async(e)=>{
        const userID=localStorage.getItem('id');
        for(var i=0;i<noticeArray.length;i++){
            for(var element in noticeArray[i]){
              if(element==='eventName'){
                if(noticeArray[i][element]===formName){
                    noticeID=noticeArray[i]['_id']
                }
              }
            }
          }
        const formDetails={userID,noticeID,formName,formDes,fields}
        const response=await fetch("/api/form",{
            method:'POST',
            body:JSON.stringify(formDetails),
            headers:{
                "Content-Type":"application/json"
            }
        })

        const json=await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setFormName('')
            setFormDes('')
            setError(null)
        }
       
    }

    const confirm=async(e)=>{
        const userID=localStorage.getItem('id');
        for(var i=0;i<noticeArray.length;i++){
            for(var element in noticeArray[i]){
              if(element==='eventName'){
                if(noticeArray[i][element]===formName){
                    noticeID=noticeArray[i]['_id']
                }
              }
            }
          }
        const formDetails={userID,noticeID,formName,formDes,fields}
        const response=await fetch("/api/form",{
            method:'POST',
            body:JSON.stringify(formDetails),
            headers:{
                "Content-Type":"application/json"
            }
        })

        const json=await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setFormName('')
            setFormDes('')
            setError(null)
        }

        setModal('modalInactive')
    }

    const previewHandler=async(e)=>{
        setModal('modalActive')
    }

    const cross=async(e)=>{
        setModal('modalInactive')
    }

    return (
    <>
    <div className='registrationForm'>
        <div className="automatedFormHeading">
            <div className="formHeadingText">Form Heading</div>
            <div className="FormHeadingFields">
                <div className="formTitle">
                    <label htmlFor="fTitle" className='headingLabelFT'>Form Title:</label>
                    <select name="eventType" id="fTitle" onChange={(e)=>setFormName(e.target.value)} value={formName}>
                        <option>
                            Select event
                        </option>
                        {noticeArray.map(data=>(
                            <option value={data.eventName}>
                                {data.eventName}
                            </option>
                        ))}
                </select>  
                </div>
                <div className="formDescription">
                    <label htmlFor="fDescription" className='headingLabelFD'>Form Description: </label>
                    <input type="text" id='fDescription'  onChange={(e)=>setFormDes(e.target.value)} value={formDes}/>
                </div>
            </div>
        </div>
        <div className="formFields">
            <div className="formHeadingText">Add Fields</div>
            {fieldNo.map((e)=>(
                <Fields/>
                // <Fields fieldDisable={fieldDisable} createForm={createForm}/>
            ))}
            <div className="addField">
                <button className='AF' onClick={handleAddField}>+ ADD FIELD</button>
            </div>
        </div>
        <div className="createFormButton">
            <button onClick={previewHandler}>Preview Form</button>
            <button onClick={sumbitFunction}>Create Form</button>
        </div>
    </div>

    {/* <div> */}
        {/* <PreviousForm/> */}
    {/* </div> */}

    <div className={modal}>
        <div className="overlay"></div>
        <div className="modal">
            <ViewForm name={formName} description={formDes} formFields={fields}/>
            <button onClick={cross}>X</button>
            <button onClick={confirm} className='formConfirm'>Confirm</button>
        </div>
    </div>
    </>
  )
}