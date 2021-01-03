import React, { useContext, useState } from 'react'
import AdminUpcoming from './AdminUpcoming';
import { AuthContext } from './Auth';
import app from './base'
import Hamburger from './Hamburger';
import NavigationBar from './NavigationBar';
// import "./Schedule.css"

const Schedule = () => {
    let month = new Date().getMonth();
    let date = new Date().getDate();
    let year = new Date().getFullYear();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    let today = new Date().getTime();
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const [text, setText] = useState(" ");


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
            <Hamburger />
            <hr/>
            <br/>

            <div className="selectionTabs">
                    <button>Sports</button>
                    <button>Cultural</button>
            </div>
            <br/>

            <input
                    type="text"
                    className="searchEventBar"
                    onChangeCapture={e => onChangeText(e)}
                    placeholder="&#xF042;SELECT AND SEARCH THE EVENT"
            />

            <div className="resultSection">
                <div className="eventDate">
                    {months[month]} {date}, {year} 
                </div>
            </div>

            {
                filteredEvents.length===0 ? (
                upcomingEvents.map((res) => {
                    return <AdminUpcoming key={res.index} slot={res.Slot} index={res.index} event={res.eventname} team1={res.Team1} team2={res.Team2} isAdmin={false} code={res.Code}/>
                })) : (
                    filteredEvents.map((res) => {
                        return <AdminUpcoming key={res.index} slot={res.Slot} index={res.index} event={res.eventname} team1={res.Team1} team2={res.Team2} isAdmin={false} code={res.Code}/>
                    })
                )
            }

            
            <div class="footer">
                <table>
                    <tr>
                        <th><h3>Coordinators:</h3></th>
                        <th><h3>Contacts:</h3></th>
                    </tr>
                    <tr>
                        <th><h4>Name 1</h4></th>
                        <th><h3>403920</h3></th>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Schedule
