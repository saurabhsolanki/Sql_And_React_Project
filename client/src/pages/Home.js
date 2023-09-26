import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./Home.css"
import { toast } from 'react-toastify'

const Home = () => {
    const [data,setData]=useState([])

    const loadData= async()=>{
        const response= await axios.get('http://localhost:5000/api/get')
        setData(response.data)
    }

    function DeleteContact (id) {
        if(window.confirm("Are you sure that you want to Delete that contact ?")){
            axios.delete(`http://localhost:5000/api/remove/${id}`)
            toast.success("Contact Delete Successfully",{autoClose: 2000,})
            setTimeout(()=>{
                loadData()
            },500)
        }
    }

    useState(()=>{
        loadData()
    },[])

  return (
    <div style={{marginTop:"150px"}} id="homeDiv">
      {/* <h2>Home Page</h2> */}
      <Link to="/addContact">
      <button className="btn btn-contact">Add Contact</button>
      </Link>

      <table className="styled-table">
        <thead>
            <tr>
                <th style={{textAlign:"center"}}>No.</th>
                <th style={{textAlign:"center"}}>User Name</th>
                <th style={{textAlign:"center"}}>User Email</th>
                <th style={{textAlign:"center"}}>User Contact</th>
                <th style={{textAlign:"center"}}>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((item,index)=>{
                    return(
                        <tr key={item.id}>
                            <th scope='row'>{index+1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.contact}</td>
                            <td>
                                <Link to={`/update/${item.id}`}>
                                <button className='btn btn-edit' >Edit</button>
                                </Link>
                                <button className="btn btn-delete" onClick={()=>DeleteContact(item.id)}>Delete</button>
                                <Link to={`/view/${item.id}`}>
                                <button className='btn btn-view' >view</button>
                                </Link>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
      </table>
    </div>
  )
}

export default Home
