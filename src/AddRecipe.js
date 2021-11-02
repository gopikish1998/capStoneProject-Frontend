import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import env from './settings';
function AddRecipe() {
    const [recipe, setRecipe] = useState("");
    const [isVeg, setVeg] = useState(true);
    const [ingredients, setIngredients] = useState("")
    const [procedure, setProcedure] = useState("")
    const [url, setUrl] = useState("")
    const [isLoading,setLoading]=useState(false)
    // const [ingredientArr,setIngredientArr]=useState([])
    // const userContext = useContext(UserContext);
    let history = useHistory();
    let handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            // setIngredientArr(ingredients.split(' '))
            let ingredientArr = ingredients.split(',')
            console.log(ingredientArr)
            await axios.post(`${env.api}/addrecipe`,{recipe,isVeg,ingredientArr,procedure,url},{headers:{
                "Authorization":window.localStorage.getItem("app_token")
            }})
            setLoading(false)
            // console.log({name,position,office, age,startDate,salary})
            history.push("/my-recipe")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">Add Recipe</h1>        
            </div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col col-sm-5">
                            <label>Recipe Name</label>
                            <input type="text" value={recipe} required onChange={(e)=>{setRecipe(e.target.value)}} className="form-control"/>
                        </div>
                        <div className="col col-sm-5">
                            <label>Ingredients</label>
                            <input type="text" value={ingredients} required onChange={(e)=>{setIngredients(e.target.value)}} className="form-control"/>
                        </div>
                        <div className="col col-2">
                            <label>is Veg</label>
                            <input type="checkbox"  className="form-control form-check-input me-1" checked={isVeg} onChange={e=>{setVeg(!isVeg)}} />
                        </div>
                        <div className="col col-sm-12">
                            <label>Procedure</label>
                            <input type="text" value={procedure} required onChange={(e)=>{setProcedure(e.target.value)}} className="form-control"/>
                        </div>
                        <div className="col col-sm-12">
                            <label>Add an Image URL</label>
                            <input type="text" value={url} required onChange={(e)=>{setUrl(e.target.value)}} className="form-control"/>
                        </div>
                        <div className="col col-sm-12">
                            <input type="submit" value="Submit" className="btn btn-primary mt-3" disabled={isLoading}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddRecipe
