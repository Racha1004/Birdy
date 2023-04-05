import{ useState } from "react";
import NavigationPanel from "./NavigationPanel"
function MainPage(props){
    const[isConnect ,setIsConnected]=useState(false);
    const[page,setPage] = useState("signin_page");

    const getConnected = () => {
        setIsConnected(true);
        setPage('message_page');
    }
    const setLogout =() =>{ 
        setIsConnected(false);
        setPage('signin_page');
    }

    return <div>
        <NavigationPanel login={getConnected} logout={setLogout} isConnect={isConnect} />
    </div>
}   

export default MainPage ; 
