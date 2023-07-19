import React,{ useState } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import { AuthContext } from '../Context/Context'

import "./NoticeForm.css"

export default function Form() {
    const [eventName,setName]=useState("")
    const [eventDes,setDes]=useState("")
    const [date,setDate]=useState(new Date())
    const [poster,setPoster]=useState("")
    const [error,setError]=useState(null)

    // const authContextValue=createContext(AuthContext);
    // const id=authContextValue.userID

    const sumbitFunction=async(e)=>{
        // e.preventDefault()
        const id=localStorage.getItem('id');
        const notice={eventName,eventDes,date,poster,id}
        console.log(notice)
        const response=await fetch("/api/notices",{
            method:'POST',
            body:JSON.stringify(notice),
            headers:{
                "Content-Type":"application/json"
            }
        })

        const json=await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setName("")
            setDes("")
            setDate("")
            setPoster("")
            setError(null)
        }
    }

  return (
    <div className="form">
        <div className="formHeading">
            Create new event
        </div>
        <div className="eventNameF">
            <label className='inputHeading'>Event Name:</label>
            <input type="text" placeholder="Enter event name" onChange={(e)=>setName(e.target.value)} value={eventName} />
        </div>
        <div className="eventDesF">
            <label className='inputHeading'>Event Description:</label>
            <input type="text" placeholder="Enter description of event" onChange={(e)=>setDes(e.target.value)} value={eventDes}/>
        </div>
        <div className="dateF">
            <label className='inputHeading'>Event Date:</label>
            <DatePicker dateFormat="dd-MM-yy" selected={date} onChange={(e) => setDate(e)} />
            {/* <input type="text" placeholder='Event date' onChange={(e)=>setDate(e.target.value)} value={date} /> */}
        </div>
        <div className="posterF">
            <label className='inputHeading'>Event Poster:</label>
            <input type="url" placeholder='Link of event poster' onChange={(e)=>setPoster(e.target.value)} value={poster} />
        </div>
        <button className='createNotice' onClick={sumbitFunction}>Create Notice</button>
        {error && <div className="loginError">{error}</div>}

    </div>
  )
}
