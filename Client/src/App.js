import Form from "./components/Form";
import Home from "./components/Home";
import Profil from "./components/Profil";
import{
    BrowserRouter as Router,
    Switch,
    Route
}from 'react-router-dom';

function App(){
    return (
        <Router>
            <Switch>
                <Route exact path="/" >
                    <Home />
                </Route>           
                <Route path="/profile/:username" >
                    <Profil/>
                </Route>
                <Route path="/formulaire" >
                    <Form/>
                </Route>
            </Switch>
        </Router>
    )
}
export default App;