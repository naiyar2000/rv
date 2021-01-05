import React, { useState } from 'react'
import AdminUpcoming from './AdminUpcoming';
import app from './base';
import Hamburger from './Hamburger';
import NavigationBar from './NavigationBar'
import "./Results.css"
import firebase from 'firebase/app'

const Results = () => {
    let month = new Date().getMonth();
    let date = new Date().getDate();
    let year = new Date().getFullYear();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // let today = new Date().getTime();
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [AddEventpopVisible, setAddEventVisible] = useState(false);


    const [_slot, setSlot] = useState("");
    const [_uOteam1, setuOteam1] = useState("");
    const [_uOteam2, setuOteam2] = useState("");
    const [_uteam1, setuteam1] = useState("");
    const [_uteam2, setuteam2] = useState("");
    const [_code, setCode] = useState("");
    const [_event, setEvent] = useState("");
    const [_name1, setName1] = useState("");
    const [_name2, setName2] = useState("");


    const [text, setText] = useState(" ");

    const submitAddEvent = async() => {
        try {
            await app.firestore().collection('events').doc(`${++upcomingEvents.length}`).set({
                eventname: _event,
                Slot: _slot,
                OTeam1: _uOteam1,
                OTeam2: _uOteam2,
                Team1: _uteam1,
                Team2: _uteam2,
                personname1: _name1,
                personname2: _name2,
                Code: _code,
                index: ++upcomingEvents.length,
                isCompleted: false,
                winner: "",
                date: firebase.firestore.Timestamp.fromDate(new Date())
            });            
        } catch (error) {
            console.error(error);
        }
    }


    React.useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await app.firestore().collection('events').orderBy("date").get();
                data.docs.forEach((res) => {
                    // if(today.valueOf() < res.data().date.toDate().valueOf()) {
                        setUpcomingEvents(oldEvents => [...oldEvents, res.data()]);
                    // }
                });
            } catch (error) {
                alert(error);
            }
        }

        if(upcomingEvents.length===0) {
            fetchData();
        }

        const temporary = upcomingEvents.filter((data) => {
            const temp1 = text.split(" ").join("");
            const temp2 = data.eventname.toLowerCase().split(" ").join("");
            return temp2.indexOf(temp1) !== -1 
        })

        setFilteredEvents(temporary)
        
    }, [text, upcomingEvents]);

    const onChangeText = (e) => {
        const temp = e.target.value.toLowerCase();
        setText(temp);
        // filterFunction();
    }

    const filterFunction = () => {
        setFilteredEvents(upcomingEvents.filter((data) => {
            const temp1 = text.split(" ").join("");
            const temp2 = data.eventname.toLowerCase().split(" ").join("");
            return temp2.indexOf(temp1) !== -1 
        }));
        console.log(filteredEvents);
    }

    return (
        <div> 

        {
        AddEventpopVisible?
            (
            <div className="popUp">
                <div className="pcontainer">
                    
                    
                    <div className="notes">
                        <h5>EVENT NAME</h5>
                        <input type="text" name="event" id="event" onChange={(e) => setEvent(e.target.value)} />
                    </div>
                    <div className="notes">
                        <h5>SLOT</h5>
                        <input type="text" name="slot" id="slot" onChange={(e) => setSlot(e.target.value)} />
                    </div>
                    <div className="notes">
                        <h5>ORGANISING TEAM1</h5>
                        <input type="text" name="Oteam1" id="Oteam1" onChange={(e) => setuOteam1(e.target.value)} />
                    </div>
                    <div className="notes">
                        <h5>ORGANISING TEAM1</h5>
                        <input type="text" name="Oteam2" id="Oteam2" onChange={(e) => setuOteam2(e.target.value)} />
                    </div>
                    <div className="notes">
                        <h5>TEAM1</h5>
                        <input type="text" name="team1" id="team1" onChange={(e) => setuteam1(e.target.value)}  />
                    </div>
                    <div className="notes">
                        <h5>TEAM2</h5>
                        <input type="text" name="team2" id="team2" onChange={(e) => setuteam2(e.target.value)}/>
                    </div>
                    <div className="notes">
                        <h5>NAME1</h5>
                        <input type="text" name="name1" id="name1" onChange={(e) => setName1(e.target.value)}/>
                    </div>
                    <div className="notes">
                        <h5>NAME2</h5>
                        <input type="text" name="name2" id="name2" onChange={(e) => setName2(e.target.value)}/>
                    </div>
                    <div className="notes">
                        <h5>CODE</h5>
                        <input type="text" name="code" id="code" onChange={(e) => setCode(e.target.value)}/>
                    </div>
                    <div className="popUpButtons">
                        <button className="cancel" onClick={() => {setAddEventVisible(!AddEventpopVisible)}}>CANCEL</button>
                        <button className="save" onClick={() => {submitAddEvent(); setAddEventVisible(!AddEventpopVisible)}}>SAVE</button>
                    </div>
                    
                </div>
            </div>
            ) : null
        }

            <NavigationBar />
            <Hamburger title="RESULTS" />
            <div className="resultSection">
                <div className="selectionTabs">
                    <button>Sports</button>
                    <button onClick={() => console.log(text)}>Cultural</button>
                </div>
                <input
                    type="text"
                    className="searchEventBar"
                    onChangeCapture={e => onChangeText(e)}
                    placeholder="&#xF042;SELECT AND SEARCH THE EVENT"
                />
                <div className="eventDate">
                    {months[month]} {date}, {year} 
                </div>
                <button className="addEvent" onClick={() => {
                        setAddEventVisible(!AddEventpopVisible);
                        // console.log(new Date().toLocaleDateString("en-US"));
                    }
                }>ADD EVENT</button>
            </div>
            {
                filteredEvents.length===0? (
                    upcomingEvents.length !==0?(upcomingEvents.map((res) => {
                    return <AdminUpcoming key={res.index} eventLength={upcomingEvents.length} index={res.index} slot={res.Slot} event={res.eventname} team1={res.Team1} team2={res.Team2} Oteam1={res.OTeam1} Oteam2={res.OTeam2} isAdmin={true} code={res.Code} isCompleted={res.isCompleted} winner={res.winner}/>
                })):(<div className="spinnerArea"><div className="spinner"><div></div><div></div></div></div>)) : (
                    filteredEvents.map((res) => {
                        return <AdminUpcoming key={res.index} eventLength={upcomingEvents.length} index={res.index} slot={res.Slot} event={res.eventname} team1={res.Team1} team2={res.Team2} Oteam1={res.OTeam1} Oteam2={res.OTeam2} isAdmin={true} code={res.Code} isCompleted={res.isCompleted} winner={res.winner}/>
                    })
                )
            }
        </div>
    )
}

export default Results
