import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import env from './settings';
function Groceries() {
    const [token,setToken]=useState(false)
    const [name,setName]=useState("")
    const [item,setItem]= useState([])
    const [isLoading,setLoading]=useState(true)
    let history=useHistory()
    let fetchUser = async ()=>{
        try {
            let data= await axios.get(`${env.api}/user`,{headers:{
                "Authorization":window.localStorage.getItem("app_token")
            }})
            setName(data.data.name)
        } catch (error) {
            console.log(error)
        }
    }
    let fetchItems = async ()=>{
        try {
            let data2 = await axios.get(`${env.api}/items`,{headers:{
                "Authorization":window.localStorage.getItem("app_token")
            }})
            setItem([...data2.data])
            console.log([...data2.data])
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(async () => {
        if(!window.localStorage.getItem("app_token")){
            setToken(false)
            history.push("/")
        }        
        else{
            setToken(true)
            await fetchUser()
            await fetchItems()
        }
    }, [])
    let handleDelete=async(id)=>{
        await axios.delete(`${env.api}/deleteitem/${id}`,{
            headers:{
                "Authorization":window.localStorage.getItem("app_token")
            }
        })
        await fetchItems()
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container px-5">
                <Link class="navbar-brand" to="/">Recipe Manage</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item"><Link class="nav-link active" aria-current="page" to="/">Home</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/groceries">Manage Groceries</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/search">Recipes</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/my-recipe">Your Recipes</Link></li>
                    </ul>
                </div>
                {token? <><span class="navbar-brand">{name}</span>
                <button class="btn navbar-btn btn-danger navbar-right pull-right" role="button" onClick={() => {
          window.localStorage.removeItem("app_token");
          setToken(!token)
          history.push("/") 
        }}>Logout</button></>:<Link class="btn navbar-btn btn-danger navbar-right pull-right" role="button" to="/login">Login</Link>}

            </div>
        </nav>
           
        <div class="container px-4 px-lg-5">            
        <Link class="btn btn-primary" to="AddGrocery">Add Groceries</Link>
        <div class="card-body">
                            <div class="table-responsive">
                                {isLoading?<h1>Loading</h1>:
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Quantity</th>
                                            <th>Units</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {/* <tfoot>
                                        <tr>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Office</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot> */}
                                    <tbody>
                                        {
                                        item.map((obj)=>{
                                            return(
                                            <tr>
                                            <td>{obj.item}</td>
                                            <td>{obj.qty}</td>
                                            <td>{obj.unit}</td>
                                            <td><Link to={`/groceries/edit/${obj._id}`} className="btn btn-sm btn-primary">EDIT</Link>
                                            <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(obj._id)} >DELETE</button></td>
                                        </tr>)
                                        })}
                                    </tbody>
                                </table>  }  
                            </div>
                        </div>
        </div>
        {/* <footer class="py-5 bg-dark">
            <div class="container px-4 px-lg-5"><p class="m-0 text-center text-white">Copyright &copy; Recipe Management by Gopi 2021</p></div>
        </footer> */}

        </div>
    )
}

export default Groceries
