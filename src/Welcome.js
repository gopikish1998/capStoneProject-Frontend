import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import env from './settings';

function Welcome() {
    const [token,setToken]=useState(false)
    const [name,setName]=useState("")
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
    useEffect(async () => {
        if(!window.localStorage.getItem("app_token")){
            setToken(false)
        }        
        else{
            setToken(true)
            await fetchUser()
        }
    }, [])
    return (
        <div>
             
            <nav class="navbar navbar-expand-lg navbar-dark" style={{background:"#1A00B2"}}>
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
        <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 align-items-center my-5">
                <div class="col-lg-7"><img class="img-fluid rounded mb-4 mb-lg-0" src="https://media.istockphoto.com/photos/varied-food-carbohydrates-protein-vegetables-fruits-dairy-legumes-on-picture-id1218254547?b=1&k=20&m=1218254547&s=170667a&w=0&h=mOEC7x7qU5NC78mCULs-jAPeLkxy8opOvIbGSnwmAyw=" alt="..." /></div>
                <div class="col-lg-5">
                    <h1 class="font-weight-light">Make or Browse Recipes</h1>
                    <p>This website helps you to manage your grocery checklist and browse for Recipes available. You can also contribute to us by adding your Recipes!  </p>
                    {/* <a class="btn btn-primary" href="#!">Call to Action!</a> */}
                </div>
            </div>
            <div class="card text-white bg-secondary my-5 py-4 text-center">
                <div class="card-body"><p class="text-white m-0">“Cooking is like painting or writing a song. Just as there are only so many notes or colors, there are only so many flavors—it’s how you combine them that sets you apart.”
– Wolfgang Puck</p></div>
            </div>
            {/* <div class="row gx-4 gx-lg-5">
               
                    <Switch>
                        <Route path="/groceries" component={Groceries} exact={true}/>
                    </Switch>
                
            </div> */}
        </div>
        <footer class="py-5 bg-dark">
            <div class="container px-4 px-lg-5"><p class="m-0 text-center text-white">Copyright &copy; Recipe Management by Gopi 2021</p></div>
        </footer>

        </div>
    )
}

export default Welcome
