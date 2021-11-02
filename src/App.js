import './App.css';
// import "./Login.css/"
import Login from './Login';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Register from './Register';
import Welcome from './Welcome';
import Groceries from './Groceries';
import AddGrocery from './AddGrocery';
import EditItem from './EditItem';
import Recipe from './Recipe';
import MyRecipe from './MyRecipe';
import AddRecipe from './AddRecipe';
import Details from './Details';
import ResetPassword from './ResetPassword';
import Reset from './Reset';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} exact={true}/>
          <Route path="/reset" component={Reset} exact={true}/>
          <Route path="/register" component={Register} exact={true}/>
          <Route path="/reset-password" component={ResetPassword} exact={true}/>
          <Route path="/" component={Welcome} exact={true}/>
          <Route path="/groceries"component={Groceries} exact={true}/>
          <Route path="/AddGrocery"component={AddGrocery} exact={true}/>
          <Route path="/groceries/edit/:id"component={EditItem} exact={true}/>
          <Route path="/search"component={Recipe} exact={true}/>
          <Route path="/my-recipe"component={MyRecipe} exact={true}/>
          <Route path="/AddRecipe" component={AddRecipe} exact={true}/>
          <Route path="/recipe/:id" component={Details} exact={true}/>
        </Switch>
      </Router>
      {/* <Dashboard/> */}
    </div>
  );
}

export default App;
