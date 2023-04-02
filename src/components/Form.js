import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, useHistory, Redirect } from 'react-router-dom';
import '../styles/Form.css';


const Form = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(true);
  const history = useHistory(); // initialize useHistory hook
  const [shouldRedirect, setShouldRedirect] = useState(false); // state to check if the form is submitted

  const handleSubmit = (event) => {
    //event.preventDefault();
    // Submit the form data to the server or do some other action.
    setShouldRedirect(true);
   // history.push('/home'); // redirect to home page
  };
  const handleSwitch = () => {
    setIsNewUser(!isNewUser);
    //history.push('/home'); // redirect to Home page when switching between create account and login
    //setShouldRedirect(true);
  };

  return (
    <Router>
      <div>
      {shouldRedirect && <Redirect to="/" />}
        <h2>{isNewUser ? 'Créer un compte' : 'Se connecter'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="login"
              value={login}
              placeholder="Votre Login.."
              onChange={(event) => setLogin(event.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Votre mot de passe.."
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {isNewUser && (
            <div>
              <input
                type="date"
                id="birthdate"
                value={birthdate}
                onChange={(event) => setBirthdate(event.target.value)}
                required
              />
            </div>
          )}
          {isNewUser && (
            <div>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Confirmez votre mot de passe.."
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
          )}
          <button type="submit">
            {isNewUser ? 'Créer un compte' : 'Se connecter'}
          </button>
        </form>
        <div>
          <button
            type="submit2"
            className="switch-button"
            onClick={() => setIsNewUser(!isNewUser)}
          >
            <Link to={isNewUser ? '/login' : '/signup'}></Link>
            {isNewUser ? 'Se connecter' : 'Créer un compte'}
          </button>
        </div>
        <div>
        <Link to="/">Retour à la page d'accueil</Link>
      </div>
      </div>
    </Router>
  );
};

export default Form;