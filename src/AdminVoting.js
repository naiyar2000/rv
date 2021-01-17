import React, { useState } from 'react';
import "./AdminVoting.css"
import app from './base';
import Hamburger from './Hamburger';
import NavigationBar from './NavigationBar';
import "./AdminVoting.css"

const AdminVoting = (props) => {

    const [votingData, setVotingData] = useState([]);
    const [teams, setTeams] = useState([]);
    const [teamPos, setTeamPos] = useState({});
    const [seeGetData, setData] = useState(false);
    const [popVisible, setPop] = useState(false);
    const [newTeam, setnewTeam] = useState("");
    const [addTeam, setaddTeam] = useState(true);
    const [removeButton, setbuttom] = useState(true);
    
    const { event } = props.match.params;

    const indices = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]

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
        // console.log(teamPos[`${teams[0]}`])

        // votingData.forEach((vote, index1) => {
        //     vote.data().teams.forEach((elt, index2) => {
        //         // let temp = teamPos
        //         console.log(teamPos[`${elt}`]);
        //         // setTeamPos(old => {
        //         //     return {...old, [`${elt}`]: 1}
        //         // })
        //     })
        // })
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
                        <div className="popContainer">
                            <h4>Enter Team Name</h4>
                            <input type="text" name="team" id="team" onChange={(e) => setnewTeam(e.target.value)}/>
                            <input type="submit" value="ADD TEAM" onClick={() => submitTeam()}/>
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
                                    <div className="listPart">
                                        <h4>{elt}</h4>
                                    </div>
                                </div>
                            )
                        })) : (null)
                    }
                    {
                        addTeam===true ? (
                            <span onClick={() => setPop(true)} style={{borderBottom: 'solid 1px #000000', marginLeft: '3.5em', color: 'blue', fontWeight: '500'}}>+ Add</span>
                        ) : (null)
                    }
                </div>
                {
                    removeButton===true ? (
                        <div className="lower1">
                            <button onClick={() => {
                                setaddTeam(!addTeam);
                                setbuttom(!removeButton);
                            }}>PROCEED</button>
                        </div>
                    ) : (
                        <div className="lower1">
                            <button onClick={() => storeTeams()}>CONFIRM TEAMS</button>
                        </div>
                    )
                }
                
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
