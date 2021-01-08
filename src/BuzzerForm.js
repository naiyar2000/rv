import React, { useContext, useState } from 'react'
import app from './base';
import Hamburger from './Hamburger'
import NavigationBar from './NavigationBar'
import "./BuzzerForm.css"
import Buzzer from './Buzzer';
import { AuthContext } from './Auth';

const BuzzerForm = () => {

    const [isActive, setActive] = useState(false);

    const [isAdmin, setAdmin] = useState(false);

    const {currentUser} = useContext(AuthContext);

    React.useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await app.firestore().collection('user').doc(`${currentUser.uid}`).get();
                setAdmin(data.data().isAdmin);
            } catch (error) {
                alert(error);
            }
        }
        fetchData();
        return app.firestore().collection('buzzer').onSnapshot(snapshot => 
                setActive(snapshot.docs[0].data().isActive));
            
    }, []);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState(null);
    const [group, setGroup] = useState("red");

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

    return (
        <div>
            <NavigationBar />
            <Hamburger title="BUZZER"/>

            <div className="inputForm">
                <label>
                    NAME
                </label> <br/>
                <div className="firstInput">
                    <input className="emailInput" name="email" type="text" onChange={(e) => setName(e.target.value)}/>
                    <button onClick={() => reset()}>Reset</button>
                    <button onClick={() => activate()}>Activate</button>
                </div> <br/>
                <label>
                    PHONE NO.
                </label> <br/>
                <div className="secondInput">
                    <input className="passwordInput" name="password" type="number" onChange={(e) => setPhone(e.target.value)}/> <br/>
                    <select name="team" id="team" onSelect={(e) => setGroup(e.target.value)}>
                        <option value="red">RED</option>
                        <option value="green">GREEN</option>
                        <option value="white">WHITE</option>
                        <option value="blue">BLUE</option>
                    </select>
                </div>
            </div>
            
            {
                isActive?(
                    <div className="buzzerComponent">
                        <Buzzer name={name} phone={phone} group={group}/>
                    </div>
                    ) : (
                    <div>
                        buzzer not active
                    </div>
                    )
            }
            

        </div>
    )
}

export default BuzzerForm
