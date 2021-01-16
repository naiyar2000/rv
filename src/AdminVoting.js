import React, { useState } from 'react';
import "./AdminVoting.css"
import app from './base';
import Hamburger from './Hamburger';
import NavigationBar from './NavigationBar';

const AdminVoting = () => {

    const [votingData, setVotingData] = useState([]);
    const [teams, setTeams] = useState([]);
    const [teamPos, setTeamPos] = useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                await app.firestore().collection('votingUser').onSnapshot(snapshot => {
                    setVotingData(snapshot.docs);
                })
                await app.firestore().collection('VotingEvents').doc('groupdance').onSnapshot(snapshot => {
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
            console.log('hello', i)
            setTeamPos(old => {
                return {...old, [`${i}`]: [0, 0, 0, 0, 0, 0, 0, 0]}
            })
        }
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
        
    }



    return (
        <div>
            {console.log(teamPos["Green A"])}
            <NavigationBar />
            <Hamburger title="Admin Voting" />
            {
                votingData.map((res, index) => {
                    return (
                        <div key={res.data().teams}>
                           {index}: {res.data().teams}
                        </div>
                    )
                })
            }
            {
                votingData.length!==0?(
                    <button onClick={() => getData()}>Get Data</button>
                ):(null)
            }
        </div>
    )
}

export default AdminVoting
