import React, { useState } from 'react'
import app from './base';
import Hamburger from './Hamburger';
import NavigationBar from './NavigationBar';
import "./BuzzerAmin.css"


const BuzzerAdmin = () => {

    const reset = async () => {
        try {
            await app.firestore().collection('buzzer').doc('first').update({
                winner: false,
                isActive: false,
                name:"",
                phone:"",
                villa:"",
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
    const [phone, setPhone] = useState(null);
    const [villa, setVilla] = useState("");
    const [group, setGroup] = useState("");

    React.useEffect(() => {
        return app.firestore().collection('buzzer').onSnapshot(snapshot => {
            setName(snapshot.docs[0].data().name);
            setPhone(snapshot.docs[0].data().phone);
            setVilla(snapshot.docs[0].data().villa);
            setGroup(snapshot.docs[0].data().group);
        })
    }, [])

    return (
        <div>

            <NavigationBar />
            <Hamburger title="Buzzer Admin" />

            <div>
                <h3>Winner is {name}</h3>
                <h4>Phone: {phone}</h4>
                <h4>Villa: {villa}</h4>
                <h4>Group: {group}</h4>
            </div>

            <button className="admin" onClick={() => reset()}>Reset</button><br/>
            <button className="admin" onClick={() => activate()}>Activate</button>

        </div>
    )
}

export default BuzzerAdmin
