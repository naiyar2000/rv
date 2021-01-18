import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "./AdminEvent.css";
import app from './base';
import Events from './Events';
import NavigationBar from './NavigationBar';
import Hamburger from './Hamburger';

const AdminEvent = () => {

    const [pop, setPop] = useState(false);
    const [calendarVisible, setCalendarvisible] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState(new Date());

    const [eventList, setEventList] = useState([]);

    React.useEffect(() => {
        return app.firestore().collection('VotingEvents').onSnapshot(snapshot => {
            setEventList(snapshot.docs);
        })
    }, [])


    const setEvent = async () => {
        try {
            if(title.length!==0&&desc.length!==0){
                await app.firestore().collection('VotingEvents').doc(`${title}`).set({
                    title: title,
                    desc: desc,
                    teams: [],
                    eventname: title,
                    date: date.toDateString(),
                    isActive: false
                })
            }
        } catch (error) {
            alert(error);
        }
    }


    return (
        <div>
            <NavigationBar />
            <Hamburger title="ADMIN VOTING" />
            {
                pop===true ? (
                    <div className="popWrapper">
                        <div className="popContainerEvent">
                            <div className="cdate">{date.toDateString()} <span style={{borderBottom: 'solid 1px #000000', marginLeft: '2em'}} onClick={() => setCalendarvisible(!calendarVisible)}>Edit</span></div>
                            {
                                calendarVisible===true ? (
                                <div className="calendar">
                                    <Calendar value={date} onChange={setDate} />
                                </div>) : (null)
                            }
                            <div className="form" onClick={() => setCalendarvisible(false)}>
                                <input type="text" placeholder="TITLE" name="title" id="title" onChange={(e) => setTitle(e.target.value)}/>
                                <input type="text" placeholder="DESCRIPTION" name="desc" id="desc" onChange={(e) => setDesc(e.target.value)}/>
                                <input type="submit" value="ADD EVENT" style={{width: '50%'}} onClick={() => {
                                    setPop(!pop);
                                    setEvent();
                                }} />
                            </div>
                        </div>
                    </div>
                ) : (null)
            }
            
            <div className="eventBody">
                <button className="submit" onClick={() => {
                        setPop(!pop)
                        setTitle("");
                        setDesc("");
                    }
                }>ADD EVENT</button>
                <div className="eventsList" style={{marginBottom: '1em'}}>
                    {
                        eventList.map((res) => {
                            return (
                                <Events key={res.data().title} title={res.data().title} desc={res.data().desc} event={res.data().eventname} date={res.data().date??null} user={false}/>
                            )
                        })
                    }
                </div>
                
            </div>
        </div>
    )
}

export default AdminEvent
