import Home from "./components/Home";
import Profil from "./components/Profil";
import{
    BrowserRouter as Router,
    Switch,
    Route
}from "react-router-dom"

function Link(){
    return (
        <Router>
            <Switch>
            {console.log("hre1")}  

                <Route path="/" >
                    {console.log("hre2")}  
                    <Home />
                </Route>           
                <Route path="/profil/:username" >
                    <Profil/>
                </Route>
            </Switch>
        </Router>
    )
}
export default Link;