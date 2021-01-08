import React, { useState } from 'react'
import app from './base';
import Hamburger from './Hamburger';
import NavigationBar from './NavigationBar';

const BuzzerAdmin = () => {

    const reset = async () => {
        try {
            await app.firestore().collection('buzzer').doc('first').update({
                winner: false,
                isActive: false
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

            <button onClick={() => reset()}>Reset</button>
            <button onClick={() => activate()}>Activate</button>

            <div>
                <h4>Winner is {name}</h4>
                <h5>Phone: {phone}</h5>
                <h5>Villa: {villa}</h5>
                <h5>Group: {group}</h5>
            </div>
        </div>
    )
}

export default BuzzerAdmin
