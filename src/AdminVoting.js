import React, { useState } from 'react';
import "./AdminVoting.css"
import app from './base';
import Hamburger from './Hamburger';
import NavigationBar from './NavigationBar';

const AdminVoting = () => {

    const [votingData, setVotingData] = useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                await app.firestore().collection('votingUser').onSnapshot(snapshot => {
                    setVotingData(snapshot.docs);
                })
            } catch (error) {
                alert(error);
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <NavigationBar />
            <Hamburger title="Admin Voting" />
            {
                votingData.map((res, index) => {
                    return (
                        <div>
                           {index}: {res.data().teams}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AdminVoting
