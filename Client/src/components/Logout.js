function Logout({ logout }){
    return (<div>
        <button className="logout-button" onClick = {logout}>
            Log out
        </button>
    </div>
    );
}
export default Logout;