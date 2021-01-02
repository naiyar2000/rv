import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import app from './base';
import "./Hamburger.css";

const Hamburger = () => {

    const [show, setShow] = useState(false);
    const toggle = () => {
        setShow(!show);
    }

    return (
        <div className="HamburgerMenu">
            <i onClick={()=>toggle()} style={{visibility: show ? "hidden": "visible"}} className="fa fa-bars fa-2x"/>
            <CSSTransition
                in={show}
                timeout={10}
                classNames="NavAnimation"
                unmountOnExit
            >
            <nav className="navbar">
                <div className="close">
                    <i onClick={()=>toggle()} className="fa fa-close fa-2x"/>
                </div>
                <div className="logo">
                    <h1>Logo/image</h1>
                </div>
                <ul className="navbar-nav">
                    <li onClick={()=>toggle()} className="nav-item"><Link to="/" className="nav-link"><span className="link-text">HOME</span></Link></li>
                    <li onClick={()=>toggle()} className="nav-item"><Link to="/results" className="nav-link"><span className="link-text">RESULTS</span></Link></li>
                    <li onClick={()=>toggle()} className="nav-item"><Link to="/schedule" className="nav-link"><span className="link-text">SCHEDULE</span></Link></li>
                    <li onClick={()=>toggle()} className="nav-item"><Link to="/scores" className="nav-link"><span className="link-text">SCORES</span></Link></li>
                    <li onClick={()=>toggle()} className="nav-item"><Link to="/teams" className="nav-link"><span className="link-text">TEAMS</span></Link></li>
                    <li onClick={()=> {toggle(); app.auth().signOut();}} className="nav-item"><Link to="" className="nav-link"><span className="link-text">SIGN OUT</span></Link></li>
                </ul>
            </nav>
            </CSSTransition>
        </div>
    )
}

export default Hamburger
