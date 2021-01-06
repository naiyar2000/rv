import React, { useState } from 'react'
import "./AdminUpcoming.css"
import app from './base';

const AdminUpcoming = ({event, slot, team1, team2, Oteam1, Oteam2, isAdmin, index, code, isCompleted, winner, date}) => {



    let [popVisible, setVisible] = useState(false);
    let [UpdatepopVisible, setUpdateVisible] = useState(false);

    const [_team1P, set1P] = useState(10);
    const [_team2P, set2P] = useState(10);
    const [_team3P, set3P] = useState(15);
    const [_team4P, set4P] = useState(15);

    let _team1;
    let _team2;
    let _team3;
    let _team4;

    if(isAdmin) {
        _team1 = team1.substr(0, team1.indexOf(' ')).toLowerCase();
        _team2 = team2.substr(0, team2.indexOf(' ')).toLowerCase();
        _team3 = Oteam1.substr(0, Oteam1.indexOf(' ')).toLowerCase();
        _team4 = Oteam2.substr(0, Oteam2.indexOf(' ')).toLowerCase();        
    }

    

    let selectedTeam = "";


    const handleChange = (e) => {
        let {value} = e.target;
        if(value===team1) {
            selectedTeam = _team1;
        } else {
            selectedTeam = _team2;
        }
        console.log(selectedTeam);
    }

    const submitScore = async () => {
        if(_team1P>_team2P) {
            try {
                await app.firestore().collection('events').doc(`${index}`).update({
                    winner: selectedTeam,
                    isCompleted: true
                })
                const Tdata = await app.firestore().collection('teams').doc(`${selectedTeam}`).get();
                const LTdata = await app.firestore().collection('teams').doc(`${_team2}`).get();
                const OTdata1 = await app.firestore().collection('teams').doc(`${_team3}`).get();
                const OTdata2 = await app.firestore().collection('teams').doc(`${_team4}`).get();
                let _Llost = LTdata.data().lost;
                let _Ltotal = LTdata.data().total;
                let _LOpoints = LTdata.data().Opoints;
                _Ltotal++;
                _Llost++;
                _LOpoints += _team2P;
                let _won = Tdata.data().won;
                let _total = Tdata.data().total;
                let _Opoints = Tdata.data().Opoints;
                _won++;
                _total++;
                _Opoints += _team1P;
                let _OTOpoints1 = OTdata1.data().Opoints;
                _OTOpoints1 += _team3P;
                let _OTOpoints2 = OTdata2.data().Opoints;
                _OTOpoints2 += _team4P;
                await app.firestore().collection('teams').doc(`${selectedTeam}`).update({
                    won: _won,
                    total: _total,
                    Opoints: _Opoints
                })
                await app.firestore().collection('teams').doc(`${_team2}`).update({
                    lost: _Llost,
                    total: _Ltotal,
                    Opoints: _LOpoints
                })
                await app.firestore().collection('teams').doc(`${_team3}`).update({
                    Opoints: _OTOpoints1
                })
                await app.firestore().collection('teams').doc(`${_team4}`).update({
                    Opoints: _OTOpoints2
                })
            } catch (error) {
                console.error(error);
            }
            
        } else {
            try {
                await app.firestore().collection('events').doc(`${index}`).update({
                    winner: selectedTeam, 
                    isCompleted: true
                })
                const Tdata = await app.firestore().collection('teams').doc(`${selectedTeam}`).get();
                const LTdata = await app.firestore().collection('teams').doc(`${_team1}`).get();
                const OTdata1 = await app.firestore().collection('teams').doc(`${_team3}`).get();
                const OTdata2 = await app.firestore().collection('teams').doc(`${_team4}`).get();
                let _Llost = LTdata.data().lost;
                let _Ltotal = LTdata.data().total;
                let _LOpoints = LTdata.data().Opoints;
                _Llost++;
                _Ltotal++;
                _LOpoints += _team1P;
                let _won = Tdata.data().won;
                let _total = Tdata.data().total;
                let _Opoints = Tdata.data().Opoints;
                let _OTpoint1 = OTdata1.data().Opoints;
                let _OTpoint2 = OTdata2.data().Opoints;
                _OTpoint1 += _team3P;
                _OTpoint2 += _team4P;
                _won++;
                _total++;
                _Opoints += _team2P;
                await app.firestore().collection('teams').doc(`${selectedTeam}`).update({
                    won: _won,
                    total: _total,
                    Opoints: _Opoints
                });
                await app.firestore().collection('teams').doc(`${_team1}`).update({
                    lost: _Llost,
                    total: _Ltotal,
                    Opoints: _LOpoints
                })
                //
                await app.firestore().collection('teams').doc(`${_team3}`).update({
                    Opoints: _OTpoint1
                })
                await app.firestore().collection('teams').doc(`${_team4}`).update({
                    Opoints: _OTpoint2
                })
            } catch (error) {
                console.error(error);
            }
        }
    }


    //updateEvents popUp variables
    const [_slot, setSlot] = useState("");
    const [_uOteam1, setuOteam1] = useState("");
    const [_uOteam2, setuOteam2] = useState("");
    const [_uteam1, setuteam1] = useState("");
    const [_uteam2, setuteam2] = useState("");
    const [_code, setCode] = useState("");


    const submitUpdatedEvent = async() => {
        try {
            await app.firestore().collection('events').doc(`${index}`).update({
                Slot: _slot,
                OTeam1: _uOteam1,
                OTeam2: _uOteam2,
                Team1: _uteam1,
                Team2: _uteam2,
                Code: _code
            });            
        } catch (error) {
            console.error(error);
        }
    }
    

    return (
        <>

        {/* Points popUp */}
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
                            value={team1}
                            name="Team"
                            type="radio"
                            onChange={handleChange}
                        />
                        {team1}
                        </div>
                        <div>
                        <input
                            id="B"
                            value={team2}
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
                                    <button className="pleft" onClick={() => set1P(old => old-1)}>&#60;</button>
                                    <div className="center">{_team1P}</div>
                                    <button className="pright" onClick={() => {
                                            if(_team1P<10){
                                                set1P(old => old+1);
                                            }
                                        }}>&#62;</button>
                                </div>
                            </div>
                            <div className="points">
                                <h6>{team2}</h6>
                                <div className="points2">
                                    <button className="pleft" onClick={() => set2P(old => old-1)}>&#60;</button>
                                    <div className="center">{_team2P}</div>
                                    <button className="pright" onClick={() => {
                                            if(_team2P<10) {
                                                set2P(old => old+1);
                                            }
                                    }}>&#62;</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h5>Organising Work</h5>
                            <div className="points">
                                <h6>{Oteam1}</h6>
                                <div className="points3">
                                <button className="pleft" onClick={() => {
                                    set3P(old => old-1);
                                }}>&#60;</button>
                                    <div className="center">{_team3P}</div>
                                    <button className="pright" onClick={() => {
                                        if(_team3P<15) {
                                            set3P(old => old+1)
                                        }
                                    }}>&#62;</button>
                                </div>
                            </div>
                            <div className="points">
                                <h6>{Oteam2}</h6>
                                <div className="points4">
                                <button className="pleft" onClick={() => set4P(old => old-1)}>&#60;</button>
                                    <div className="center">{_team4P}</div>
                                    <button className="pright" onClick={() => {
                                        if(_team4P<15) {
                                            set4P(old => old+1);
                                        }
                                    }}>&#62;</button>
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
                        <button className="save" onClick={() => {submitScore(); setVisible(!popVisible)}}>SAVE</button>
                    </div>
                    
                </div>
            </div>
            ) : null
        }

        {/* updateEvent popUp */}
        {
        UpdatepopVisible?
            (
            <div className="popUp">
                <div className="pcontainer">
                    
                    
                    <div className="notes">
                        <h5>SLOT</h5>
                        <input type="text" name="slot" id="slot" onChange={(e) => setSlot(e.target.value)} placeholder={slot} />
                    </div>
                    <div className="notes">
                        <h5>ORGANISING TEAM1</h5>
                        <input type="text" name="Oteam1" id="Oteam1" onChange={(e) => setuOteam1(e.target.value)} placeholder={Oteam1} />
                    </div>
                    <div className="notes">
                        <h5>ORGANISING TEAM1</h5>
                        <input type="text" name="Oteam2" id="Oteam2" onChange={(e) => setuOteam2(e.target.value)} placeholder={Oteam2} />
                    </div>
                    <div className="notes">
                        <h5>TEAM1</h5>
                        <input type="text" name="team1" id="team1" onChange={(e) => setuteam1(e.target.value)}  placeholder={team1} />
                    </div>
                    <div className="notes">
                        <h5>TEAM2</h5>
                        <input type="text" name="team2" id="team2" onChange={(e) => setuteam2(e.target.value)} placeholder={team2}/>
                    </div>
                    <div className="notes">
                        <h5>CODE</h5>
                        <input type="text" name="code" id="code" onChange={(e) => setCode(e.target.value)} placeholder={code}/>
                    </div>
                    <div className="popUpButtons">
                        <button className="cancel" onClick={() => {setUpdateVisible(!UpdatepopVisible)}}>CANCEL</button>
                        <button className="save" onClick={() => {submitUpdatedEvent(); setUpdateVisible(!UpdatepopVisible)}}>SAVE</button>
                    </div>
                    
                </div>
            </div>
            ) : null
        }

        <div className="upcomingEvents">
            
                <div>{code}</div>
                <div>{date.toDate().toString()[0]}{date.toDate().toString()[1]}{date.toDate().toString()[2]},{date.toDate().toString()[3]}{date.toDate().toString()[4]}{date.toDate().toString()[5]}{date.toDate().toString()[6]}{date.toDate().toString()[7]}{date.toDate().toString()[8]}{date.toDate().toString()[9]}{date.toDate().toString()[10]}{date.toDate().toString()[11]}{date.toDate().toString()[12]}{date.toDate().toString()[13]}{date.toDate().toString()[14]}{date.toDate().toString()[15]}</div>
                <div className="events">{event}</div>
                <div>{team1} VS {team2}</div>
            
                <div>{slot}</div>

                {
                    isCompleted===false? (
                        <div className="Ubutton">
                        {isAdmin===true?(<button className="enter" onClick={() => {setVisible(!popVisible)}}>ENTER</button>):(null)}
                        {isAdmin===true?(<button className="enter" onClick={() => {setUpdateVisible(!UpdatepopVisible)}}>Update</button>):(null)}
                    </div>
                    ): ( winner?(<div style={{fontSize: 15, color: '#25CA46', fontWeight: 'bold'}}>{winner} won</div>):(null))
                }
               
            
        </div>
        </>
    )
}

export default AdminUpcoming
