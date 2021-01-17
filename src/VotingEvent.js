import React, { useState } from 'react'
import app from './base';
import Events from './Events';
import Hamburger from './Hamburger';

const VotingEvent = () => {

    const [eventList, setEventList] = useState([]);

    React.useEffect(() => {
        return app.firestore().collection('VotingEvents').onSnapshot(snapshot => {
            setEventList(snapshot.docs);
        })
    }, [])




    return (
        <div>
            <Hamburger title="VOTING" />
            <div className="eventBody">
                <div className="eventsList" style={{marginBottom: '1em'}}>
                    {
                        eventList.map((res) => {
                            return (
                                <Events key={res.data().title} title={res.data().title} desc={res.data().desc} event={res.data().eventname} date={res.data().date??null} user={true}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default VotingEvent
