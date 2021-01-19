import React, { useState } from 'react';
import app from './base';
import "./VotingResult.css";
import { Bar } from 'react-chartjs-2'
import NavigationBar from './NavigationBar';
import Hamburger from './Hamburger';
import VotingResultList from './VotingResultList';

const UserResult = (props) => {

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
                    temp += res*(10-index2);
                })
                setPoints(old => {
                    return {...old, [`${elt}`]: temp, [`${temp}`]: elt}
                })
            })
            teams.forEach(elt => console.log(elt));
            // getRank();
            setData(false);
        })
    }

    // const getRank = () => {
    //     teams.forEach((elt, index) => {
    //         setPointsArray(old => [...old, points[elt]])
    //     })
    // }


    return (

        <div>
            <Hamburger title="Result" />
            <NavigationBar />
            <div className="ResultArea">
                <h2>{event}</h2>
                {/* {
                        teams.length!==null ? (teams.map((elt, index) => {
                            return (
                                <VotingResultList teams={teams} elt={elt} indices={indices} key={index} points={points} index={index}/>
                            )
                        })) : (null)
                } */}
                <VotingResultList teams={teams} points={points} />
                {
                    votingData.length!==0&&teams.length!==0&&seeGetData===true?(
                        <button style={{backgroundColor: "#4E4E4E", color:"white", borderRadius:3, width:"30%"}} onClick={() => getData()}>Get Results</button>
                    ):(null)
                }
            </div>
        </div>
    )
    
}

export default UserResult
