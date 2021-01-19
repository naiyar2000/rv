import React, { useState } from 'react';
import "./AdminVoting.css"
import app from './base';
import Hamburger from './Hamburger';
import NavigationBar from './NavigationBar';
import "./AdminVoting.css"
import { useHistory } from 'react-router';

const AdminVoting = (props) => {

    const [votingData, setVotingData] = useState([]);
    const [teams, setTeams] = useState([]);
    const [teamPos, setTeamPos] = useState({});
    const [seeGetData, setData] = useState(false);
    const [popVisible, setPop] = useState(false);
    const [newTeam, setnewTeam] = useState("");
    const [addTeam, setaddTeam] = useState(true);
    const [removeButton, setbuttom] = useState(true);
    const [popAlert, setPopAlert] = useState(false);

    const { event } = props.match.params;

    const indices = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]

    const history = useHistory();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                await app.firestore().collection('votingUser').onSnapshot(snapshot => {
                    setVotingData(snapshot.docs);
                })
                await app.firestore().collection('VotingEvents').doc(`${event}`).onSnapshot(snapshot => {
                    setTeams(snapshot.data().teams);
                })
            } catch (error) {
                alert(error);
            }
        }
        fetchData()
    }, [])

    React.useEffect(() => {

        for(let i of teams) {
            setTeamPos(old => {
                return {...old, [`${i}`]: [0, 0, 0, 0, 0, 0, 0, 0]}
            })
        }
        setData(true);
    }, [teams])

    const getData = () => {
        votingData.forEach((vote, index1) => {
            // console.log(teamPos[`${vote.data().teams[0]}`][index1])
            vote.data().teams.forEach((elt, index2) => {
                let temp = teamPos[`${elt}`];
                temp[index2]++;
                setTeamPos(old => {
                    return {...old, [`${elt}`]: temp}
                })
                setData(false)
            })
        })
    }

    const submitTeam = () => {
        if(newTeam!==""){
            setTeams(old => {
                return [...old, newTeam]
            })
        }
        setPop(false)
    }

    const storeTeams = async () => {
        try {
            await app.firestore().collection('VotingEvents').doc(`${event}`).update({
                teams: teams
            })
            setPopAlert(true)
        } catch (error) {
            alert(error);
        }
    }



    return (
        <div>
            {/* {console.log(teamPos["Green A"])} */}
            <NavigationBar />
            <Hamburger title="Admin Voting" />
            {
                popVisible===true ? (
                    <div className="pop">
                        <div className="popContainer2" style={{position: 'relative'}}>
                            <div className="close" onClick={() => setPop(false)} style={{position: 'absolute', top: '10px', right: '10px'}}>X</div>
                            <h4>Enter Team Name</h4>
                            <input type="text" name="team" id="team" onChange={(e) => setnewTeam(e.target.value)}/>
                            <input style={{backgroundColor: "#4E4E4E", color:"white", borderRadius:3, width:"40%"}} type="submit" value="ADD TEAM" onClick={() => submitTeam()}/>
                        </div>
                    </div>
                ) : (null)
            }
            {
                popAlert===true ? (
                    <div className="pop">
                        <div className="popContainer" style={{border: 'solid 2px #000000', borderRadius: '10px'}}>
                            <h4>Your Event has been created</h4>
                            <button style={{backgroundColor: "#4E4E4E", color:"white", borderRadius:3}} onClick={() => history.goBack()}>OK</button>
                        </div>
                    </div>
                ) : (null)
            }
            {/* {
                votingData.map((res, index) => {
                    return (
                        <div key={res.data().teams}>
                           {index}: {res.data().teams}
                        </div>
                    )
                })
            } */}
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
                    {
                        addTeam===true ? (
                            <button onClick={() => setPop(true)} style={{width:"30%", backgroundColor:"grey", marginLeft: '2em', color: 'vlack', fontWeight: '500', borderRadius:"5px"}}>Add Team</button>
                        ) : (null)
                    }
                </div><br />
                <div className="lower1">
                            <button className="submit" style={{width: 140}} onClick={() => storeTeams()}>CONFIRM TEAMS</button>
                </div>
                
            </div>
            {/* {
                votingData.length!==0&&teams.length!==0&&seeGetData===true?(
                    <button onClick={() => getData()}>Get Data</button>
                ):(null)
            } */}
        </div>
    )
}

export default AdminVoting
