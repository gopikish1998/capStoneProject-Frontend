import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import env from './settings';
function Details(props) {
    const [data,setData]=useState({});
    const[token,setToken]=useState("")
    const [name,setName]=useState("")
    const [ingredient,setIngredient]=useState("")

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
    let fetchRecipe = async ()=>{
        try {
            let data1 = await axios.get(`${env.api}/recipe/${props.match.params.id}`,{headers:{
                "Authorization":window.localStorage.getItem("app_token")
            }})
            setData(data1.data)
            setIngredient(data1.data.ingredients.join(","))
            console.log(data1)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(async () => {
        if(!window.localStorage.getItem("app_token")){
            setToken(false)
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
        <div class="card">
            <img src={`${data.url}`} class="card-img-top" alt="Recipe Image shown here" />
            <div class="card-body">
            <h5 class="card-title">{data.recipe}</h5>
            
                {/* Ingredients: {data.ingredients.join(',')} */}
          
            <p>Ingredients: {ingredient}</p>
          
            <p class="card-text">
                Procedure:{data.procedure}
            </p>
  </div>
</div>
        
        </div>
    )
}

export default Details
