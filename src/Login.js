import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import env from './settings';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [message,setMessage]=useState(true);
    const [token,setToken]=useState(false);
    const history = useHistory()

    let handleSubmit= async function(e){
        e.preventDefault();
        try {
            let logindata = await axios.post(`${env.api}/login`,{email,password});
            if(logindata.data.message){
                window.localStorage.setItem("app_token",logindata.data.token)
                // console.log(logindata.data.user)
                history.push(`/`)
            }        
        } catch (error) {
            setMessage(false)
        }
    }
    useEffect(() => {
        try {
            if(!window.localStorage.getItem("app_token")){
                setToken(false)
                console.log(token)
            }
            else{
                setToken(true)
                console.log(token)
                history.push('/')
            }
        } catch (error) {
            
        }
    }, [])
    return (
        <div>
            <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div class="card card0 border-0">
        <div class="row d-flex">
            <div class="col-lg-6">
                <div class="card1 pb-5">
                    <div class="row"> <img src="https://i1.wp.com/anantacreative.com/wp-content/uploads/2020/10/Restaurant-Man-1.png?fit=1500%2C1500&ssl=1" class="logo"/> </div>
                    <div class="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="https://www.asimot.com/wp-content/uploads/2018/02/Manage-the-Recipe-for-Your-Restaurant-Business-800x400.png" class="image"/> </div>
                </div>
            </div>
            <div class="col-lg-6">
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <div class="card2 card border-0 px-4 py-5">
                    <h2>Login</h2>
                    {message? <></>:<label style={{color:"red"}}>Username/Password is incorrect</label>}
                    <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Email Address</h6>
                        </label> <input value={email} onChange={e => setEmail(e.target.value)} class="form-control mb-4" type="email" placeholder="Enter a valid email address" required/> </div>
                    <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Enter Password</h6>
                        </label> <input value={password} onChange={e => setpassword(e.target.value)} class="form-control mb-4"  type="password" placeholder="Enter password" required/> </div>
                        
                    
                    <div class="row mb-3 px-3"> <input type="submit" class="btn btn-blue text-center" value="Login"/> </div>
                    <div class="row mb-4 px-3"> <small class="font-weight-bold">Don't have an account? <Link to="/register" class="text-danger ">Register here</Link></small> </div>
                </div>
                </form>
            </div>
        </div>
        <div class="bg-blue py-4">
            <div class="row px-3"> <small class="ml-4 ml-sm-5 mb-2">Copyright &copy; 2021. Created by Gopi Kishore</small>
                <div class="social-contact ml-4 ml-sm-auto"> <span class="fa fa-facebook mr-4 text-sm"></span> <span class="fa fa-google-plus mr-4 text-sm"></span> <span class="fa fa-linkedin mr-4 text-sm"></span> <span class="fa fa-twitter mr-4 mr-sm-5 text-sm"></span> </div>
            </div>
        </div>
    </div>
</div>
        </div>
    )
}

export default Login
