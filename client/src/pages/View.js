import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import './View.css'

const View = () => {
    const [user,setUser]=useState({})
    const {id}=useParams()
    const navigate=useNavigate()


    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`).then((res)=>{
            setUser({...res.data[0]})
        })
    },[id])
  return (
    <div style={{marginTop:"150px"}}>

      <div className="card">
        <div className="card-header">
            <p>User Contact Detail</p>
        </div>

        <div className="container">
            <strong>ID: </strong>
            <span>{id}</span>
            <br />
            <br />
            
            <strong>Name: </strong>
            <span>{user.name}</span>
            <br />
            <br />

            <strong>Email: </strong>
            <span>{user.email}</span>
            <br />
            <br />

            <strong>Contact: </strong>
            <span>{user.contact}</span>
            <br />
            <br />

            <Link to="/">
            <div className="btn btn-edit">Go Back</div>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default View
