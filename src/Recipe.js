import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import env from './settings';

function Recipe() {
    const [data,setData]=useState([]);
    const[token,setToken]=useState("")
    const [name,setName]=useState("")
    const [search,setSearch]=useState("")
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
    let searchRecipe = async (e,searchRecipe)=>{
        setSearch(e.target.value)
        try {
            if(search){
                let data1=await axios.get(`${env.api}/search/${search}`)
                setData(data1.data)
            }
            else{
                fetchRecipe(    )
            }
            
        } catch (error) {
            
        }
    }
    let fetchRecipe = async ()=>{
        try {
            let data1 = await axios.get(`${env.api}/recipes`)
            setData(data1.data)
            console.log(data1.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(async () => {
        if(!window.localStorage.getItem("app_token")){
            setToken(false)
            history.push('/')
        }        
        else{
            setToken(true)
            await fetchUser()
            await fetchRecipe()
        }
    }, [])
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container px-5">
                <Link class="navbar-brand" to="/">Recipe Manage</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                
                {token? <><div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item"><Link class="nav-link active" aria-current="page" to="/">Home</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/groceries">Manage Groceries</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/search">Recipes</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/my-recipe">Your Recipes</Link></li>
                    </ul>
                </div><span class="navbar-brand">{name}</span>
                <button class="btn navbar-btn btn-danger navbar-right pull-right" role="button" onClick={() => {
          window.localStorage.removeItem("app_token");
          setToken(!token)
          history.push("/") 
        }}>Logout</button></>:<Link class="btn navbar-btn btn-danger navbar-right pull-right" role="button" to="/login">Login</Link>}
            </div>
            </nav>
            <div class="container input-group row">
                <div class="form-outline col-lg-11">
                    <input type="search" value={search} onChange={e=>searchRecipe(e,search)} placeholder="Search..." id="form1" class="form-control" />
                    {/* <label class="form-label" for="form1">Search</label> */}
                </div>
                <div class="form-outline col-lg-1">
                <button type="button" onClick={e=>searchRecipe(e,search)} class="btn btn-primary">
                    <i class="fas fa-search"></i>
                </button>
                </div>
            </div>
            <div class="row gx-4 gx-lg-5">
            {
                data.map((obj)=>{return(
                    
                    <div class="col-md-4 mb-5">
                    <div class="card h-100">
                        <img src={`${obj.url}`} class="card-img-top" alt="Image"/>
                        <div class="card-body">
                            <h2 class="card-title">{obj.recipe}   <span ><img style={{height:"20px"}} src={obj.isVeg?"https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsNOENdNsWdiIEaDAwwOOwCSBWjiS8GFPbiA&usqp=CAU"}/></span></h2>
                            {/* <p class="card-text">{obj.procedure}</p> */}
                        </div>
                        <div class="card-footer"><Link class="btn btn-primary btn-sm" to={`/recipe/${obj._id}`}>More Info</Link></div>
                    </div>
                </div>
                )})
            }
        </div>
        </div>
    )
}

export default Recipe
