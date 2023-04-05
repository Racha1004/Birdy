

import{ useState } from "react";

function Login(props){

    const[login ,setLogin]=useState('');
    const[password,setPassword] = useState('');

    function getLogin(event){
        setLogin(event.target.value);
    }
    function getPassword(event){
        setPassword(event.target.value);
    }

    return <form method='POST' action =''>
        <label htmlFor="login">Login</label><input id='login' type = 'text' onChange={getLogin}/>
        <label htmlFor="mdp">Mot de passe</label><input id='mdp' type = 'password' onChange={getPassword}/>
        <button type="submit"> Sign in</button>
    </form>
}


export default Login;