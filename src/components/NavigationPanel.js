import Login from "./Login"
import Logout from "./Logout"

function NavigationPanel(props){
    return <nav>
        { props.isConnect ? <Logout logout = {props.logout} /> :<Login  login = {props.login} /> }

    </nav>
}
//SI on veut ecrire a l interieur du return div un boutton ayant comme class=roro il faut ecrire className=roro

export default NavigationPanel;