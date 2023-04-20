import Login from "./components/Login";
import Home from "./components/Home";
import Profil from "./components/Profil";
import Register from "./components/Register";
import{
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
}from 'react-router-dom';

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App(){
    const { user } = useContext(AuthContext);
    //console.log(user)
    return (
        <Router>
            <Switch>
                <Route exact path="/" >
                    {user ? <Home /> : <Register />}
                </Route>      
                <Route path="/login">{user ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route path="/register">
                {user ? <Redirect to="/login" /> : <Register />}
                </Route>     
                <Route path="/profil/:username" >
                    <Profil/>
                </Route>
            </Switch>
        </Router>
    )
}
export default App;