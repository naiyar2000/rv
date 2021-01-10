import React, { useState } from 'react';
import app from './base';
import "./Buzzer.css"

const Buzzer = ({name, group}) => {

    const [isWinner, setWinner] = useState(true)

    React.useEffect(() => {
        return app.firestore().collection('buzzer').onSnapshot(snapshot => 
                setWinner(snapshot.docs[0].data().winner)
            );
    }, []);

    const submitData = async () => {
        try {
            const data = await app.firestore().collection('buzzer').doc('first').get();
            if(data.data().winner===false) {
                await app.firestore().collection('buzzer').doc('first').update({
                    name: name,
                    // phone: phone,
                    group: group,
                    // villa: villa,
                    winner: true
                })
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
        {
            isWinner===true? ( 
                <div className="buzzer" >
                    <span>Winner Decided</span>
                </div>
            ):
            (
                <div className="buzzer" onClick={() => submitData()}>
                    <span>Buzzer active</span>
                </div> 
            ) 
        }
        </>
        
    )
}

export default Buzzer
