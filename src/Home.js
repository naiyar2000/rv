import React, { useState } from 'react'
import app from './base'
import Hamburger from './Hamburger';
import "./Home.css"
import NavigationBar from './NavigationBar';
import UpcomingEvents from './UpcomingEvents';

const Home = () => {
    // const { currentUser } = useContext(AuthContext);
    // const [event, setEvent] = useState(" ");
    // let today = new Date().toLocaleDateString("en-US");
    let today = new Date().getTime();
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    let [red, setRed] = useState({});
    let [blue, setBlue] = useState({});
    let [green, setGreen] = useState({});
    let [white, setWhite] = useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await app.firestore().collection('events').orderBy("date").get();
                const rdata = await app.firestore().collection('teams').doc('red').get();
                const bdata = await app.firestore().collection('teams').doc('blue').get();
                const wdata = await app.firestore().collection('teams').doc('white').get();
                const gdata = await app.firestore().collection('teams').doc('green').get();
                setRed(rdata.data());
                setBlue(bdata.data());
                setGreen(gdata.data());
                setWhite(wdata.data());
                data.docs.forEach((res) => {
                    // if(today.valueOf() < res.data().date.toDate().valueOf()) {
                        setUpcomingEvents(oldEvents => [...oldEvents, res.data()]);
                    // }
                });
                // console.log(data.docs[0].data().date.toDate());
            } catch (error) {
                alert(error);
            }
        }
        fetchData();
    }, []);

    return (
        <section>
            <NavigationBar />
            <Hamburger />

            <div className="home"><br/>
                <h3>RV Togetherness Festival</h3>
                <br/>
                <h3>Jan 1st to Feb 14th</h3>
                <h3>It's fun to be together</h3>
            </div>

            <div className="calendar">
                    <h5>Upcoming events</h5>
                    <h5>Calendar</h5>
            </div>
            <hr/>

            <div className="white-container">
                {
                    upcomingEvents.map((x) =>  {
                        return (
                        <UpcomingEvents event={x.eventname} slot={x.Slot} team1={x.Team1} team2={x.Team2}/>
                        )
                    })
                }
            </div>

            <br/>
            <div className="calendar2">
               <h4>Teams</h4>
            </div>
            <hr/>

            <div className="TeamContainer">
                <div className="red extra">
                    <div className="teamHeader">
                        <div className="block">RF</div>
                        <div className="teamName">Red Fire</div>
                    </div>
                    <div className="eventWon">
                        <div>Event Won</div>
                        <div>12</div>
                    </div>
                    <div className="eventLost">
                        <div>Event Lost</div>
                        <div>5</div>
                    </div>
                    <div className="numberOfEvents">
                        <div>No of Events</div>
                        <div>17</div>
                    </div>
                    <div className="pointsEarnedEvent">
                        <div>Points Earned(Event)</div>
                        <div>1200</div>
                    </div>
                    <div className="pointsEarnedOrganised">
                        <div>Points Earned(Organised)</div>
                        <div>35</div>
                    </div>
                </div>
                <div className="red extra">
                    <div className="teamHeader">
                        <div className="block">RF</div>
                        <div className="teamName">Red Fire</div>
                    </div>
                    <div className="eventWon">
                        <div>Event Won</div>
                        <div>12</div>
                    </div>
                    <div className="eventLost">
                        <div>Event Lost</div>
                        <div>5</div>
                    </div>
                    <div className="numberOfEvents">
                        <div>No of Events</div>
                        <div>17</div>
                    </div>
                    <div className="pointsEarnedEvent">
                        <div>Points Earned(Event)</div>
                        <div>1200</div>
                    </div>
                    <div className="pointsEarnedOrganised">
                        <div>Points Earned(Organised)</div>
                        <div>35</div>
                    </div>
                </div>
                <div className="red">
                    <div className="teamHeader">
                        <div className="block">RF</div>
                        <div className="teamName">Red Fire</div>
                    </div>
                    <div className="eventWon">
                        <div>Event Won</div>
                        <div>{red.won}</div>
                    </div>
                    <div className="eventLost">
                        <div>Event Lost</div>
                        <div>{red.lost}</div>
                    </div>
                    <div className="numberOfEvents">
                        <div>No of Events</div>
                        <div>{red.total}</div>
                    </div>
                    <div className="pointsEarnedEvent">
                        <div>Points Earned(Event)</div>
                        <div>{red.Epoints}</div>
                    </div>
                    <div className="pointsEarnedOrganised">
                        <div>Points Earned(Organised)</div>
                        <div>{red.Opoints}</div>
                    </div>
                </div>
                <div className="white">
                <div className="teamHeader">
                        <div className="block">WW</div>
                        <div className="teamName">White Winds</div>
                    </div>
                    <div className="eventWon">
                        <div>Event Won</div>
                        <div>{white.won}</div>
                    </div>
                    <div className="eventLost">
                        <div>Event Lost</div>
                        <div>{white.lost}</div>
                    </div>
                    <div className="numberOfEvents">
                        <div>No of Events</div>
                        <div>{white.total}</div>
                    </div>
                    <div className="pointsEarnedEvent">
                        <div>Points Earned(Event)</div>
                        <div>{white.Epoints}</div>
                    </div>
                    <div className="pointsEarnedOrganised">
                        <div>Points Earned(Organised)</div>
                        <div>{white.Opoints}</div>
                    </div>
                </div>
                <div className="blue">
                <div className="teamHeader">
                        <div className="block">BO</div>
                        <div className="teamName">Blue Ocean</div>
                    </div>
                    <div className="eventWon">
                        <div>Event Won</div>
                        <div>{blue.won}</div>
                    </div>
                    <div className="eventLost">
                        <div>Event Lost</div>
                        <div>{blue.lost}</div>
                    </div>
                    <div className="numberOfEvents">
                        <div>No of Events</div>
                        <div>{blue.total}</div>
                    </div>
                    <div className="pointsEarnedEvent">
                        <div>Points Earned(Event)</div>
                        <div>{blue.Epoints}</div>
                    </div>
                    <div className="pointsEarnedOrganised">
                        <div>Points Earned(Organised)</div>
                        <div>{blue.Opoints}</div>
                    </div>
                </div>
                <div className="green">
                <div className="teamHeader">
                        <div className="block">GE</div>
                        <div className="teamName">Green Earth</div>
                    </div>
                    <div className="eventWon">
                        <div>Event Won</div>
                        <div>{green.won}</div>
                    </div>
                    <div className="eventLost">
                        <div>Event Lost</div>
                        <div>{green.lost}</div>
                    </div>
                    <div className="numberOfEvents">
                        <div>No of Events</div>
                        <div>{green.total}</div>
                    </div>
                    <div className="pointsEarnedEvent">
                        <div>Points Earned(Event)</div>
                        <div>{green.Epoints}</div>
                    </div>
                    <div className="pointsEarnedOrganised">
                        <div>Points Earned(Organised)</div>
                        <div>{green.Opoints}</div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>

            <div className="footer">
                    <div>
                        <h3>Coordinators:</h3>
                        <h5>Name 1</h5>
                    </div>
                    <div>
                        <h3>Contacts:</h3>
                        <h5>403920</h5>
                    </div>
            </div>

    

        </section>
    )
}

export default Home;
