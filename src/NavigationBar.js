import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Auth';
import app from './base';
import "./NavigationBar.css"

const NavigationBar = () => {
    const { currentUser } = useContext(AuthContext);
    const [isAdmin, setAdmin] = useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await app.firestore().collection('user').doc(`${currentUser.uid}`).get();
                setAdmin(data.data().isAdmin);
            } catch (error) {
                alert(error);
            }
        }
        fetchData();
    }, [currentUser]);


    if(isAdmin) {
        return (
            <div className="NavigationSection">
                <h1 className="title">RV TOGETHERNESS FESTIVAL</h1>
                <h4 className="subtitle">Jan 1st to Feb 14th</h4>
                <div className="navOptions">
                <div className="homeOption"><Link to="/">HOME</Link></div>
                <div className="resultsOption"><Link to="/results">RESULTS</Link></div>
                    <div className="scheduleOption"><Link to="/schedule">SCHEDULE</Link></div>
                    <div className="scoresOption"><Link to="/scores">SCORES</Link></div>
                    <div className="teamsOption"><Link to="/teams">TEAMS</Link></div>
                    <div className="rulesOption"><Link to="/rules">RULES</Link></div>
                    <div className="newsOption"><Link to="/news">NEWS</Link></div>
                    <div className="buzzerOption"><Link to="/buzzerForm">BUZZER</Link></div>
                    <div className="votingOption"><Link to="/VotingEvent">VOTING</Link></div>
                    <div className="AdminEvent"><Link to="/AdminEvent">AdminV</Link></div>
                    <div className="signOut"><Link to="/" onClick={() => app.auth().signOut()}>SIGN OUT</Link></div>
                    {/* <div className="votingOption"><Link to="/">VOTING</Link></div>
                    <div className="photosOption"><Link to="/">PHOTOS</Link></div>
                    <div className="discussionOption"><Link to="/">DISCUSSION FORUM</Link></div> */}
                </div>
            </div>
        )
    } else {
        return (
            <div className="NavigationSection">
                <h1 className="title">RV TOGETHERNESS FESTIVAL</h1>
                <h4 className="subtitle">Jan 1st to Feb 14th</h4>
                <div className="navOptions">
                <div className="homeOption"><Link to="/">HOME</Link></div>
                    <div className="scheduleOption"><Link to="/">SCHEDULE</Link></div>
                    <div className="scoresOption"><Link to="/">SCORES</Link></div>
                    <div className="teamsOption"><Link to="/">TEAMS</Link></div>
                    <div className="rulesOption"><Link to="/">RULES</Link></div>
                    <div className="newsOption"><Link to="/">NEWS</Link></div>
                    <div className="votingOption"><Link to="/VotingEvent">VOTING</Link></div>
                    <div className="signOut"><Link to="/" onClick={() => app.auth().signOut()}>SIGN OUT</Link></div>
                    {/* <div className="votingOption"><Link to="/">VOTING</Link></div>
                    <div className="photosOption"><Link to="/">PHOTOS</Link></div>
                    <div className="discussionOption"><Link to="/">DISCUSSION FORUM</Link></div> */}
                </div>
            </div>
        )
    }
    
}

export default NavigationBar
