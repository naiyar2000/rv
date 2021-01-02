import React, { useState } from 'react'
import "./AdminUpcoming.css"

const AdminUpcoming = ({event, slot, team1, team2, visible, toggle}) => {

    let [popVisible, setVisible] = useState(false);


    const handleChange = (e) => {
        let {value} = e.target;
        console.log(value);
    }

    return (
        <>
         {
            popVisible?
                (
                <div className="popUp">
                    <div className="pcontainer">
                        <h2>{event}</h2>
                        <h5 style={{marginBottom: 10, marginTop: 0}}>WON</h5>
                        <div className="selector">
                            <div style={{marginBottom: 10}}>
                            <input
                                id="A"
                                value="Team A"
                                name="Team"
                                type="radio"
                                onChange={handleChange}
                            />
                            {team1}
                            </div>
                            <div>
                            <input
                                id="B"
                                value="Team B"
                                name="Team"
                                type="radio"
                                onChange={handleChange}
                            />
                            {team2}
                            </div>
                        </div>
                        <div className="pointsDist">
                            <div>
                                <h5>Safe and Fair play points</h5>
                                <div className="points">
                                    <h6>{team1}</h6>
                                    <div className="points1">
                                        <button className="pleft">&#60;</button>
                                        <div className="center">10</div>
                                        <button className="pright">&#62;</button>
                                    </div>
                                </div>
                                <div className="points">
                                    <h6>{team2}</h6>
                                    <div className="points2">
                                        <button className="pleft">&#60;</button>
                                        <div className="center">10</div>
                                        <button className="pright">&#62;</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h5>Organising Work</h5>
                                <div className="points">
                                    <h6>{team1}</h6>
                                    <div className="points3">
                                    <button className="pleft">&#60;</button>
                                        <div className="center">15</div>
                                        <button className="pright">&#62;</button>
                                    </div>
                                </div>
                                <div className="points">
                                    <h6>{team2}</h6>
                                    <div className="points4">
                                    <button className="pleft">&#60;</button>
                                        <div className="center">15</div>
                                        <button className="pright">&#62;</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="notes">
                            <h5>NOTES</h5>
                            <input type="text" name="notes" id="notes"/>
                        </div>
                        <div className="popUpButtons">
                            <button className="cancel" onClick={() => {setVisible(!popVisible)}}>CANCEL</button>
                            <button className="save">SAVE</button>
                        </div>
                        
                    </div>
                </div>
                ) : null
            }
        <div className="upcomingEvents">
            <div>
            <div className="events">{event}</div>
            <div>{team1} VS {team2}</div>
            </div>
            <div>
            <div>SLOT: {slot}</div>
            <button className="enter" onClick={() => {setVisible(!popVisible)}}>ENTER</button>
            </div>
        </div>
        </>
    )
}

export default AdminUpcoming
