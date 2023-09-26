import React, { useEffect, useState } from 'react'
import  './AddEdit.css'
import axios from 'axios'
import {useHistory, Link, useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const init={
    name:"",
    email:"",
    contact:""
}

const AddEdit = () => {
    const [state,setState]=useState(init)
    const {id}=useParams()
    const navigate=useNavigate()
    const {name,email,contact}=state

    function handleSubmit(e){
        e.preventDefault()
        if(!name || !email || !contact){
            toast.error("Please Provide value into each input field")
        }
        else{
           if(!id){
                axios.post("http://localhost:5000/api/post",{
                    name,email,contact
                }).then(()=>{
                    setState({name:"", email:"", contact:""})
                }).catch((err)=>{
                    console.log(err)
                    toast.error(err.response.data)
                })
                
                toast.success("Contact Added Successfully",{autoClose: 1000,})
           }

           else{
            axios.put(`http://localhost:5000/api/update/${id}`,{
                name,email,contact
            }).then(()=>{
                setState({name:"", email:"", contact:""})
            }).catch((err)=>{
                console.log(err)
                toast.error(err.response.data)
            })
            
            toast.success("Contact updated Successfully",{autoClose: 2000,})
           }

            setTimeout(()=>{
                navigate("/")
            },1000)
            
        }
    }

    function handleInputChange (e) {
       const {name,value}=e.target
       setState({...state,[name]:value})
    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`).then((res)=>{
            setState({...res.data[0]})
        })
    },[id])

  return (
    <div style={{marginTop:"100px"}}>

      {/* <h2>Add Edit</h2> */}

      <form onSubmit={handleSubmit}>

            {/* for name */}
        <label htmlFor="name">Name</label>
        <input type="text" id='name' name='name' placeholder='Enter Your Name...' value={name || ""} onChange={handleInputChange} />
        
            {/* for email */}
        <label htmlFor="email">Email</label>
        <input type="email" id='email' name='email' placeholder='Enter Your email...' value={email || ""} onChange={handleInputChange} />

            {/* for contact */}
        <label htmlFor="contact">Contact</label>
        <input type="number" id='contact' name='contact' placeholder='Enter Your Contact Number...' value={contact || ""} onChange={handleInputChange} />

            <input type="submit" value={id?"Update":"Save"} />

            <Link to="/">
                <input type="button" value="Go Back" />
            </Link>
      </form>
    </div>
  )
}

export default AddEdit
