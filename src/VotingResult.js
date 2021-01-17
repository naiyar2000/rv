import React, { useState } from 'react';
import app from './base';
import "./VotingResult.css"

const VotingResult = (props) => {

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


    return (
        <div>
            result page, check react dev tools to know the state which contains data for graph.
        </div>
    )
}

export default VotingResult
