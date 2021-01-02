import React from 'react'
import "./UpcomingEvents.css"

const UpcomingEvents = ({event, slot, team1, team2}) => {
    return (
        <div className="container">
            <h3>{event}</h3>
            <h4>{slot}</h4>
            <div className="ucenter">
                    <div className="block1">{team1[0]}</div>
                    <div className="left">{team1}</div>
                    <div className="versus">VS</div>
                    <div className="right">{team2}</div>
                    <div className="block2">{team2[0]}</div>
            </div>
        </div>
    )
}

export default UpcomingEvents
