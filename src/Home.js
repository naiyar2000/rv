import React, { useContext, useState } from 'react'
import { AuthContext } from './Auth';
import app from './base'
import "./Home.css"
import NavigationBar from './NavigationBar';

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState(" ");
    const [villa, setVilla] = useState(" ");
    const [team, setTeam] = useState(" ");

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await app.firestore().collection('user').doc(`${currentUser.uid}`).get();
                setUser(data.data().name);
                setVilla(data.data().villa);
                setTeam(data.data().team);
            } catch (error) {
                alert(error);
            }
        }
        fetchData();
    }, [currentUser]);

    return (
        <section>
            <NavigationBar />
            <div className="home"><br/>
                RV Togetherness Festival.<br/><br/>
                Jan 1st to Feb 14th.<br/><br/>
                It's fun to be together.<br/><br/>
            </div><br/>

            <table class="calendar">
                <tr>
                    <th>Upcoming events</th>
                    <th>Calendar</th>
                </tr>
            </table>
            <hr/>

            <div className="white-container">
                <div>
                    <h3 className="tt">Table Tennis Junior</h3>
                    <h4 className="tt">Slot 1: 7am-9pm</h4>
                    <table className="center">
                        <tr>
                            <th className="left"><h3>Red Fire</h3></th>
                            <th>VS</th>
                            <th className="left"><h3>White Winds</h3></th>
                        </tr>
                    </table>
                </div>
                <div>
                    <h3 className="tt">Table Tennis Junior</h3>
                    <h4 className="tt">Slot 1: 7am-9pm</h4>
                    <table className="center">
                        <tr>
                            <th className="left"><h3>Red Fire</h3></th>
                            <th>VS</th>
                            <th className="left"><h3>White Winds</h3></th>
                        </tr>
                    </table>
                </div>
            </div>

            <br/>
            <div className="calendar">
                Teams
            </div>
            <hr/>

            <div className="blue-container">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <br/>
            <br/>

            <div className="footer">
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

    

        </section>
    )
}

export default Home;
