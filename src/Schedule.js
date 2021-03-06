import React, { useState } from 'react'
import AdminUpcoming from './AdminUpcoming';
import app from './base'
import Hamburger from './Hamburger';
import NavigationBar from './NavigationBar';
// import "./Schedule.css"

const Schedule = () => {
    let month = new Date().getMonth();
    let date = new Date().getDate();
    let year = new Date().getFullYear();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    // let today = new Date().getTime();
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const [text, setText] = useState(" ");
    const [isSports, setSports] = useState(true);

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
        fetchData();
    }, []);

    const onChangeText = (e) => {
        const temp = e.target.value.toLowerCase();
        setText(temp);
        filterFunction();
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
            <NavigationBar />
            <Hamburger title="SCHEDULE" />
            <br/>

            <div className="resultSection">
                <div className="selectionTabs">
                    {isSports===true?(
                                <button onClick={() => setSports(true)} style={{border: '#000000 solid 2px'}}>Sports</button>
                            ):(
                                <button onClick={() => setSports(true)}>Sports</button>
                            )}
                            {isSports===false?(
                                <button onClick={() => setSports(false)} style={{border: '#000000 solid 2px'}}>Cultural</button>

                            ):(
                                <button onClick={() => setSports(false)}>Cultural</button>
                                )}
                </div>
                <input
                    type="text"
                    className="searchEventBar"
                    onChangeCapture={e => onChangeText(e)}
                    placeholder="&#xF042;SELECT AND SEARCH THE EVENT"
                />
            </div>

            

            {/* <div className="resultSection">
                <div className="eventDate">
                    {months[month]} {date}, {year} 
                </div>
            </div> */}

            {
                filteredEvents.length===0 ? (
                    upcomingEvents.length !==0?(
                upcomingEvents.map((res) => {
                    return <AdminUpcoming key={res.index} slot={res.Slot} index={res.index} event={res.eventname} team1={res.Team1} team2={res.Team2} isAdmin={false} code={res.Code} winner={res.winner} isCompleted={res.isCompleted} date={res.date}/>
                })):(<div className="spinnerArea"><div className="spinner"><div></div><div></div></div></div>)) : (
                    filteredEvents.map((res) => {
                        return <AdminUpcoming key={res.index} slot={res.Slot} index={res.index} event={res.eventname} team1={res.Team1} team2={res.Team2} isAdmin={false} code={res.Code} winner={res.winner} isCompleted={res.isCompleted} date={res.date}/>
                    })
                )
            }

            
            <div className="footer">
                    <div>
                        <h3>Coordinators:</h3>
                        <h5>Rajendra Tapadia</h5>
                        
                    </div>
                    <div>
                        <h3>Contacts:</h3>
                        <h5>+919490233170</h5>
                    </div>
            </div>

        </div>
    )
}

export default Schedule
