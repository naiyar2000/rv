import React, { useContext, useState } from 'react'
import app from './base';
import Hamburger from './Hamburger'
import NavigationBar from './NavigationBar'
import "./BuzzerForm.css"
import Buzzer from './Buzzer';
// import { AuthContext } from './Auth';

const BuzzerForm = () => {

    const [isActive, setActive] = useState(false);

    const [isAdmin, setAdmin] = useState(false);

    // const {currentUser} = useContext(AuthContext);

    React.useEffect(() => {

        // const fetchData = async () => {
        //     try {
        //         const data = await app.firestore().collection('user').doc(`${currentUser.uid}`).get();
        //         setAdmin(data.data().isAdmin);
        //     } catch (error) {
        //         alert(error);
        //     }
        // }
        // fetchData();
        return app.firestore().collection('buzzer').onSnapshot(snapshot => 
                setActive(snapshot.docs[0].data().isActive));
            
    }, []);

    const [name, setName] = useState("");
    // const [phone, setPhone] = useState(null);
    // const [villa, setVilla] = useState("");
    const [group, setGroup] = useState("");

    // const reset = async () => {
    //     try {
    //         await app.firestore().collection('buzzer').doc('first').update({
    //             winner: false,
    //             isActive: false, 
    //             name: "",
    //             phone: "",
    //             villa: "",
    //             group: ""
    //         })
    //     } catch (error) {
    //         alert(error);
    //     }
    // }

    // const activate = async () => {
    //     try {
    //         await app.firestore().collection('buzzer').doc('first').update({
    //             isActive: true
    //         })
    //     } catch (error) {
    //         alert(error);
    //     }
    // }

    return (
        <div>
            {/* {
                currentUser?(
                    <>
                        <NavigationBar />
                        <Hamburger title="BUZZER" />
                    </>
                ) : (null)
            } */}
            {/* <NavigationBar /> */}
            {/* <Hamburger title="BUZZER"/> */}
            <div className="result">
                <h3>RV Togetherness (Antakshari)</h3>
            </div>
            <div className="inputForm">
                {/* <label>
                    NAME
                </label> <br/> */}
                <div className="firstInput">
                    <input className="emailInput1" name="email" type="text" placeholder="Enter your name here" onChange={(e) => setName(e.target.value)}/>
                    {/* <button onClick={() => reset()}>Reset</button>
                    <button onClick={() => activate()}>Activate</button> */}
                </div>
                {/* <label>
                    PHONE NO.
                </label> <br/> */}
                {/* <div className="secondInput">
                    <input className="emailInput1" name="password" type="number" placeholder="Enter your mobile no. here" onChange={(e) => setPhone(e.target.value)}/> <br/>
                </div> */}
                {/* <label>
                    VILLA NO.
                </label> <br/> */}
                 <div className="firstInput">
                    {/* <input type="text" className="passwordInput1" onChange={(e) => setVilla(e.target.value)} /> */}
                    <select className="emailInput1" name="team" id="" value={group} onChange={(e) => setGroup(e.target.value)}>
                        <option value="">Select your team</option>
                        <option value="BLUE OCEAN">BLUE OCEAN</option>
                        <option value="GREEN EARTH">GREEN EARTH</option>
                        <option value="RED FIRE">RED FIRE</option>
                        <option value="WHITE WINDS">WHITE WINDS</option>
                    </select>
                 </div>
            </div>
            
            {
                isActive?(
                    name.length!==0&&group.length!==0?(
                    <div className="buzzerComponent">
                        <Buzzer name={name} group={group} />
                    </div>):(<div className="buzzerinactive" >
                        <span>Please Enter all the fields</span>
                    </div>)
                    ) : (
                    <div className="buzzerinactive" >
                        <span>Buzzer inactive</span>
                    </div>
                    )
            }
        </div>
    )
}

export default BuzzerForm
