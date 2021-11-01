import React from 'react';
import axios from 'axios';
import { useState,useContext } from 'react';
import { useHistory } from "react-router-dom";
import env from './settings';
function AddGrocery() {
    const [item, setItem] = useState("");
    const [qty, setQty] = useState("");
    const [unit, setUnit] = useState("");
    const [isLoading,setLoading]=useState(false) 
    // const userContext = useContext(UserContext);
    let history = useHistory();
    let handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            await axios.post(`${env.api}/additem`,{item,qty,unit},{headers:{
                "Authorization":window.localStorage.getItem("app_token")
            }})
            setLoading(false)
            // console.log({name,position,office, age,startDate,salary})
            history.push("/groceries")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">Add Item</h1>        
            </div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col col-md-4">
                            <label>Item Name</label>
                            <input type="text" value={item} required onChange={(e)=>{setItem(e.target.value)}} className="form-control"/>
                        </div>
                        <div className="col col-md-4">
                            <label>Quantity</label>
                            <input type="number" value={qty} required onChange={(e)=>{setQty(e.target.value)}} className="form-control"/>
                        </div>
                        <div className="col col-md-4">
                            <label>Measuring Units</label>
                            <input type="text" value={unit} required onChange={(e)=>{setUnit(e.target.value)}} className="form-control"/>
                        </div>
                        <div className="col col-md-12">
                            <input type="submit" value="Submit" className="btn btn-primary mt-3" disabled={isLoading}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddGrocery
