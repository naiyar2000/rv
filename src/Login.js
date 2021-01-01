import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import app from "./base.js";
import './login.css'
import { AuthContext } from "./Auth.js";

const Login = ({ history }) => {

    const { currentUser } = useContext(AuthContext);

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        let res = await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );


  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="loginSection">
        <div className="title">
            RV TOGETHERNESS FESTIVAL <br/> <span className="spanText">Jan 1st to Feb 14th</span>
        </div>
        <div className="formSide">
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
            <label>
            Name
            </label> <br/>
            <input className="emailInput" name="email" type="email" /> <br/>
            <label>
            Password
            </label> <br/>
            <input className="passwordInput" name="password" type="password" /> <br/>
            <button className="loginButton" type="submit">Log in</button>
            <Link to="/signUp"><span className="details">If not registered you can Register</span></Link>
        </form>
        </div>
    </div>
  );
};

export default withRouter(Login);