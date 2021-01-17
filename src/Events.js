import React from 'react';
import { Link } from 'react-router-dom';
import "./Events.css"

const Events = ({title, desc, event, date, user}) => {
    return (
        <div>
            <div className="EventTitle">
                <h1 style={{borderBottom: 'solid 1px #000000', display: 'inline-block'}}>{title}</h1>
                <h5>{date}</h5>
            </div>
            <div style={{paddingLeft: '1em', paddingRight: '1em'}}>
                <p>{desc}</p>
            </div>
            {
                user===true ? (
                    <div className="links" style={{display: 'flex', justifyContent: 'space-between', width: '80%', alignContent: 'center'}}>
                        <Link to={`/voting/${event}`}><span style={{marginLeft: '1.5em'}}>link</span> </Link>
                    </div>
                ) : (
                    <div className="links" style={{display: 'flex', justifyContent: 'space-between', width: '80%', alignContent: 'center'}}>
                        <Link to={`/AdminVoting/${event}`}><span style={{marginLeft: '1.5em'}}>link</span> </Link>
                        <Link to={`/startVoting/${event}`}><span>Begin Voting</span></Link>
                        <Link to={`/VotingResult/${event}`}><span>Result</span></Link>
                    </div>
                )
            }
           
            
        </div>
    )
}

export default Events
