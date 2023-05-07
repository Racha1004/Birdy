import { useContext, useRef } from "react";
import "../styles/Form.css";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";
import { FadeLoader, Spinner } from "react-spinners"
import { useHistory } from "react-router";
//import "react-spinners/FadeLoader.css";


export default function Login() {
  const email = useRef();
  const password = useRef();
  const {user,isFetching,error, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    try{
      await loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
      );
      //history.push("/");
    }catch(err){
      console.log(err);
    }
  };
  const handleRegister = () => {
    history.push("/register");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">BIRDY</h3>
          <span className="loginDesc">
          Ne manquez pas ce qui se passe dans le monde.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="8"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <FadeLoader color="#ffffff" loading={isFetching} size={20} />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Vous n'avez pas de compte ?</span>
            <button className="loginRegisterButton" onClick={handleRegister}>
              {isFetching ? (
                <FadeLoader color="#ffffff" loading={isFetching} size={20} />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
