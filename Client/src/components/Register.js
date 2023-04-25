import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext ,useRef} from "react";
import '../styles/Form.css';
import { useHistory } from "react-router";


export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const {isFetching,dispatch } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try { 
        await axios.post("/api/user/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Birdy</h3>
          <span className="loginDesc">
            Ne manquez pas ce qui se passe dans le monde.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleRegister}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="8"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Créer un compte
            </button>
              <span className="loginRegisterProposition">
                Vous avez déjà un compte?
              </span>
              <button className="loginRegisterButton" onClick={handleLogin}>
                Connectez-vous
              </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}
