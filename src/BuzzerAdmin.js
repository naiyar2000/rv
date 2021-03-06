import React, { useState } from 'react'
import app from './base';
import Hamburger from './Hamburger';
import NavigationBar from './NavigationBar';
import "./BuzzerAmin.css";
import image1 from './assets/1.png'
import image2 from './assets/2.png'
import image3 from './assets/3.png'


const BuzzerAdmin = () => {

    const reset = async () => {
        try {
            await app.firestore().collection('buzzer').doc('first').update({
                winner: false,
                isActive: false,
                name:"",
                // phone:"",
                // villa:"",
                group:""
            })
        } catch (error) {
            alert(error);
        }
    }

    const activate = async () => {
        try {
            await app.firestore().collection('buzzer').doc('first').update({
                isActive: true
            })
        } catch (error) {
            alert(error);
        }
    }

    const [name, setName] = useState("");
    // const [phone, setPhone] = useState(null);
    // const [villa, setVilla] = useState("");
    const [group, setGroup] = useState("");

    React.useEffect(() => {
        return app.firestore().collection('buzzer').onSnapshot(snapshot => {
            setName(snapshot.docs[0].data().name);
            // setPhone(snapshot.docs[0].data().phone);
            // setVilla(snapshot.docs[0].data().villa);
            setGroup(snapshot.docs[0].data().group);
        })
    }, [])

    return (
        <div>

            <NavigationBar />
            <Hamburger title="Buzzer Admin" />

            {
                name.length!==0?(<div className="result">
                    <div className="mom">
                        <div className="child"><img src={image2} alt="" height="60" width="60"/></div>
                        <div className="child"><h3>We have a winner !!</h3></div>
                        <div className="child"><img src={image1} alt="" height="60" width="60"/></div>
                    </div>
                    <h3>{name}</h3>
                    {/* <h4>Phone: {phone}</h4> */}
                    {/* <h4>Villa: {villa}</h4> */}
                    <h4>Group: {group}</h4>
                </div>):(<div className="result">
                    <div className="mom">
                        <div className="child"><img src={image3} alt="" height="60" width="60"/></div>
                        <div className="child"><h3>Winner not decided yet</h3></div>
                        <div className="child"><img src={image3} alt="" height="60" width="60"/></div>
                    </div>
                    <h3>Name:</h3>
                    {/* <h4>Phone: {phone}</h4> */}
                    {/* <h4>Villa: {villa}</h4> */}
                    <h4>Group:</h4>
                </div>)
            }
            <br/><br/><br/><br/><br/>
            <button className="buzzer" onClick={() => {reset(); activate();}}><h3>Activate Buzzer</h3></button><br/>
            {/* <button className="admin" onClick={() => activate()}>Activate</button> */}

        </div>
    )
}

export default BuzzerAdmin
