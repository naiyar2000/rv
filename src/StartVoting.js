import React, { useState } from 'react'
import app from './base';
import Hamburger from './Hamburger';
import NavigationBar from './NavigationBar';
import "./StartVoting.css";
import ReactStopWatch from 'react-stopwatch'
import { Link, Redirect, useHistory } from 'react-router-dom';

const StartVoting = (props) => {

    const [teams, setTeams] = useState([]);
    const [Pop, setPop] = useState(false);
    const [Watch, setWatch] = useState(false);
    const history = useHistory();
    const [popAlert, setpopAlert] = useState(false);

    const { event } = props.match.params;

    const indices = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                await app.firestore().collection('VotingEvents').doc(`${event}`).onSnapshot(snapshot => {
                    setTeams(snapshot.data().teams);
                })
            } catch (error) {
                alert(error);
            }
        }
        fetchData()
    }, [])

    const start = async () => {
        try {
            await app.firestore().collection('VotingEvents').doc(`${event}`).update({
                isActive: true
            })
        } catch (error) {
            alert(error);
        }
    }

    const stop = async () => {
        try {
            await app.firestore().collection('VotingEvents').doc(`${event}`).update({
                isActive: false
            })
            setPop(!Pop);
            setpopAlert(!popAlert);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div>
            <NavigationBar />
            <Hamburger title="Admin Voting" />
            {
                popAlert===true ? (
                    <div className="pop">
                        <div className="popContainer" style={{border: 'solid 2px #000000', borderRadius: '10px'}}>
                            <h4>Event voting has been stopped</h4>
                            <button style={{padding: '1em'}} onClick={() => history.goBack()}>OK</button>
                        </div>
                    </div>
                ) : (null)
            }
            <div className="wrapper">
                <div className="upper">
                    <div className="headerVoting">
                        <h2>{event}</h2>
                        <h5>{new Date().toDateString()}</h5>
                    </div>
                    
                    {
                        teams.length!==null ? (teams.map((elt, index) => {
                            return (
                                <div className="teamList">
                                    <h4 style={{width: '2em'}}>{indices[index]}</h4>
                                    <div className="listPart1">
                                        <h4>{elt}</h4>
                                    </div>
                                </div>
                            )
                        })) : (null)
                    }
                </div>
                {
                    Pop===true ? (
                        <div className="pop">
                            <div className="popContainer2" style={{position: 'relative'}}>
                                <div className="close" onClick={() => setPop(false)} style={{position: 'absolute', top: '10px', right: '10px'}}>X</div>
                                {
                                    Watch===true ? (
                                        <div className="watch">
                                        <ReactStopWatch
                                            seconds={0}
                                            minutes={0}
                                            hours={0}
                                            // limit="00:00:10"
                                            onChange={({ hours, minutes, seconds }) => {
                                            // do something
                                            }}
                                            onCallback={() => console.log('Finish')}
                                            render={({ formatted, hours, minutes, seconds }) => {
                                            return (
                                                <div style={{fontSize: '25px', fontWeight: 'bold'}}>
                                                    { hours } : { minutes } : { seconds }
                                                </div>
                                            );
                                            }}
                                        />
                                    </div>
                                    ) : (
                                        <div style={{fontSize: '25px', fontWeight: 'bold'}}>
                                            0 : 0 : 0
                                        </div>)
                                }
                                {
                                    Watch===false ? (
                                        <button onClick={() => {
                                                setWatch(true);
                                                start();
                                            }
                                        }>START</button>
                                    ) : (
                                        <button onClick={() => {
                                                setWatch(false);
                                                stop();
                                            }
                                        }>STOP</button>
                                    )
                                }
                            </div>
                        </div>
                    ) : (null)
                }
                <div className="lower1">
                    <button className="submit" onClick={() => setPop(true)}>ACTIVATE</button>
                </div>
            </div>
        </div>
    )
}

export default StartVoting
