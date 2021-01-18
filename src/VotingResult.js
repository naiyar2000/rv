import React, { useState } from 'react';
import app from './base';
import "./VotingResult.css";
import { Bar } from 'react-chartjs-2'
import NavigationBar from './NavigationBar';
import Hamburger from './Hamburger';

const VotingResult = (props) => {

    const [votingData, setVotingData] = useState([]);
    const [teams, setTeams] = useState([]);
    const [teamPos, setTeamPos] = useState({});
    const [seeGetData, setData] = useState(false);
    const [popVisible, setPop] = useState(false);
    const [newTeam, setnewTeam] = useState("");
    const [addTeam, setaddTeam] = useState(true);
    const [removeButton, setbuttom] = useState(true);
    const [teamSelected, setTeam] = useState(0);
    const [points, setPoints] = useState({});
    const [pointArray, setPointsArray] = useState([]);
    
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
    }, [teams])

    const getData = () => {
        votingData.forEach((vote, index1) => {
            // console.log(teamPos[`${vote.data().teams[0]}`][index1])
            if(vote.data()[`${event}`]) {
                vote.data()[`${event}`].forEach((elt, index2) => {
                    let temp = teamPos[`${elt}`];
                    temp[index2]++;
                    setTeamPos(old => {
                        return {...old, [`${elt}`]: temp}
                    })
                    setData(false)
                })
            }
            teams.forEach((elt, index1) => {
                let temp = 0;
                teamPos[`${elt}`].forEach((res, index2) => {
                    temp += res*((10-index2)*10);
                })
                setPoints(old => {
                    return {...old, [`${elt}`]: temp}
                })
            })
            getRank();
            setData(false);
        })
    }

    const getRank = () => {
        teams.forEach((elt, index) => {
            setPointsArray(old => [...old, points[elt]])
        })
    }


    return (

        <div>
            <Hamburger title="Result" />
            <NavigationBar />
            <div className="ResultArea">
                <h2>{event}</h2>
                {
                        teams.length!==null ? (teams.map((elt, index) => {
                            return (
                                <div className="teamList">
                                    <h4 style={{width: '2em', display: 'inline'}}>{indices[index]}</h4>
                                    <div className="listPart">
                                        <h4>{elt}</h4>
                                    </div>     
                                    <span>{points[elt]}</span>  
                                </div>
                            )
                        })) : (null)
                    }
                <h3>Group Wise Analysis</h3>
                <select name="group" id="group" value={teamSelected} onChange={(e) => setTeam(e.target.value)}>
                    {
                        teams.map((elt, index) => {
                            return (
                                <option value={index} key={elt}>{elt}</option>
                            )
                        })
                    }
                </select>
                <Bar 
                    data={{
                        labels: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
                        datasets: [
                            {
                                label: 'No. of people voted',
                                data: teamPos[`${teams[teamSelected]}`]
                            }
                        ]
                    }}
                />
                {
                    votingData.length!==0&&teams.length!==0&&seeGetData===true?(
                        <button onClick={() => getData()}>Get Data</button>
                    ):(null)
                }
            </div>
        </div>
    )
    
}

export default VotingResult
