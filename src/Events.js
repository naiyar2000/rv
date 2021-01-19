import React from 'react';
import { Link } from 'react-router-dom';
import "./Events.css"

const Events = ({title, desc, event, date, user}) => {
    return (
        <div>
            <div className="EventTitle">
                <h2 style={{display: 'inline-block'}}>{title}</h2>
                <h5>{date}</h5>
            </div>
            <div style={{paddingLeft: '1em', paddingRight: '1em'}}>
                <p>{desc}</p>
            </div>
            {
                user===true ? (
                    <div className="links" style={{display: 'flex', justifyContent: 'space-between', width: '80%', alignContent: 'center'}}>
                        <Link to={`/voting/${event}`}><span style={{marginLeft: '1.5em'}}>Voting</span> </Link>
                        <Link to={`/UserResult/${event}`}><span>Results</span></Link>
                    </div>
                ) : (
                    <div className="links" style={{display: 'flex', justifyContent: 'space-between', width: '80%', alignContent: 'center'}}>
                        <Link to={`/AdminVoting/${event}`}><span style={{marginLeft: '1.5em'}}>Add Event</span> </Link>
                        <Link to={`/startVoting/${event}`}><span>Voting</span></Link>
                        <Link to={`/VotingResult/${event}`}><span>Results</span></Link>
                    </div>
                )
            }<br />
           
            
        </div>
    )
}

export default Events
