import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import app from "./base";
import "./signUp.css"


const SignUp = ({history}) => {


    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password, villa, team } = event.target.elements;
        try {
            let res = await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            await app.firestore().collection('user').doc(res.user.uid).set({
                name: email.value,
                villa: villa.value,
                team: team.value
            });
            history.push("/");
        } catch (error) {
          alert(error);
        }
      }, [history]);

    return (
        <div className="signUpSection">
            <div className="title">
                RV TOGETHERNESS FESTIVAL <br/> <span className="spanText">Jan 1st to Feb 14th</span>
            </div>
            <div className="formSide">
            <h1>Sign up</h1>
            <form onSubmit={handleSignUp}>
                <label>
                Name
                </label> <br/>
                <input className="emailInput" name="email" type="email" /> <br/>
                <label>
                Villa Number
                </label> <br/>
                <input className="emailInput" name="villa" type="villa" /> <br/>
                <label>
                Team Name
                </label> <br/>
                <select className="emailInput" name="team" id="team">
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="yellow">Yellow</option>
                    <option value="white">White</option>
                </select> <br/>
                <label>
                Password
                </label> <br/>
                <input className="passwordInput" name="password" type="password" /> <br/>
                <button className="signUpButton" type="submit">Sign Up</button>
                <Link to="/login"><span className="details">Login</span></Link>
            </form>
            </div>
        </div>
    )
}

export default withRouter(SignUp);
