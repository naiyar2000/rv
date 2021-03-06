import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import { AuthContext } from './Auth';
import app from './base';
import "./Hamburger.css";

const Hamburger = ({title}) => {

    const [show, setShow] = useState(false);
    const toggle = () => {
        setShow(!show);
    }


    const { currentUser } = useContext(AuthContext);
    const [isAdmin, setAdmin] = useState(false);


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await app.firestore().collection('user').doc(`${currentUser.uid}`).get();
                setAdmin(data.data().isAdmin);
            } catch (error) {
                // alert(error);
            }
        }
        fetchData();
    }, [currentUser]);

    return (
        <>
        <div style={{height: 50}}></div>
        <div className="HamburgerMenu">
            <h4 style={{margin: 0, paddingLeft: 50, paddingTop: 15, color: "#ffffff"}}>{title}</h4>
            {/* <i onClick={()=>toggle()} style={{visibility: show ? "hidden": "visible"}} className="fa fa-bars fa-2x"/> */}
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
                    <h1>RV Togetherness</h1>
                </div>
                <ul className="navbar-nav">
                    <li onClick={(e)=>
                            toggle()
                        } className="nav-item"><Link to="/" className="nav-link"><span className="link-text">HOME</span></Link></li>
                    {isAdmin===true?<li onClick={()=>{
                        toggle();
                    }} className="nav-item"><Link to="/results" className="nav-link"><span className="link-text">RESULTS</span></Link></li>: null}
                    {/* <li onClick={()=>toggle()} className="nav-item"><Link to="/schedule" className="nav-link"><span className="link-text">SCHEDULE</span></Link></li>
                    <li onClick={()=>toggle()} className="nav-item"><Link to="/scores" className="nav-link"><span className="link-text">SCORES</span></Link></li> */}
                    <li onClick={()=>toggle()} className="nav-item"><Link to="/buzzerForm" className="nav-link"><span className="link-text">Buzzer</span></Link></li>
                    {isAdmin===true?<li onClick={()=>{
                        toggle();
                    }} className="nav-item"><Link to="/buzzerAdmin" className="nav-link"><span className="link-text">BuzzerAdmin</span></Link></li>: null}
                    {/* <li onClick={()=>toggle()} className="nav-item"><Link to="/teams" className="nav-link"><span className="link-text">TEAMS</span></Link></li>
                    <li onClick={()=>toggle()} className="nav-item"><Link to="/news" className="nav-link"><span className="link-text">NEWS</span></Link></li> */}
                    <li onClick={()=> {toggle(); app.auth().signOut();}} className="nav-item"><Link to="" className="nav-link"><span className="link-text">SIGN OUT</span></Link></li>

                </ul>
            </nav>
            </CSSTransition>
        </div>
        </>
    )
}

export default Hamburger
