import React, { useContext, useState } from 'react'
import "./News.css"
import NavigationBar from './NavigationBar';
import Hamburger from './Hamburger';
import app from './base';
import NewTemplate from './NewTemplate';
import { AuthContext } from './Auth';
import firebase from 'firebase/app'
import "./AdminUpcoming.css"

const News = () => {

    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [popVisible, setPopVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [notice, setNotice] = useState("");

    const {currentUser} = useContext(AuthContext);

    const [isAdmin, setAdmin] = useState(false);


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await app.firestore().collection('user').doc(`${currentUser.uid}`).get();
                const data = await app.firestore().collection('news').orderBy("date").get();
                data.docs.forEach((res) => {
                    setUpcomingEvents(oldEvents => [...oldEvents, res.data()]);
                });
                setAdmin(userData.data().isAdmin);
            } catch (error) {
                alert(error);
            }
        }
        fetchData();
    }, []);


    const submitNews = async () => {
        try {
            await app.firestore().collection('news').doc().set({
                date: firebase.firestore.Timestamp.fromDate(new Date()),
                title: title,
                notice: notice
            });            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <NavigationBar />
            <Hamburger />
            {
                isAdmin===true?(<div className="addEvent">
            <button onClick={() => setPopVisible(!popVisible)}>ADD NOTICE</button>
            </div>): null
            }

    {
        popVisible?
            (
            <div className="popUp">
                <div className="pcontainer" style={{height: 200}}>
                    
                    
                    <div className="notes">
                        <h5>Title</h5>
                        <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} placeholder="Title"/>
                    </div>
                    <div className="notes">
                        <h5>NOTICE</h5>
                        <input type="text" name="notice" id="notice" onChange={(e) => setNotice(e.target.value)} placeholder="Notice" />
                    </div>
                    <div className="popUpButtons">
                        <button className="cancel" onClick={() => {setPopVisible(!popVisible)}}>CANCEL</button>
                        <button className="save" onClick={() => {submitNews(); setPopVisible(!popVisible)}}>SAVE</button>
                    </div>
                    
                </div>
            </div>
            ) : null
        }

            
            {
              (
                upcomingEvents.map((res) => {
                    return <NewTemplate title={res.title} date={res.date} notice={res.notice}/>
                }))
            }
        </div>
    )
}

export default News
