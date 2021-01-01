import React from 'react'
import "./Scores.css"
import "./Results.css"
import NavigationBar from './NavigationBar';

const Scores = () => {
    let month = new Date().getMonth();
    let date = new Date().getDate();
    let year = new Date().getFullYear();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return (
        <div>
            <NavigationBar /><hr/>
            <br/>

            <div className="resultSection">
                <div className="selectionTabs">
                    <button>Sports</button>
                    <button>Cultural</button>
                </div>
                
                <div className="searchEventBar">
                    <i className="fas fa-search" style={{marginRight: 10, marginLeft: 10}}/>
                    <span>Search and Select the Event</span>
                </div>
                
                <div className="eventDate">
                    {months[month]} {date}, {year} 
                </div>
                <h3><b>EVENT NAME</b></h3>
                <div className="scoreheading">
                    <span><b>TEAM NAME</b></span>
                    <span><b>ATTENDED</b></span>
                    <span><b>WON</b></span>
                    <span><b>LOST</b></span>
                    <span><b>TIE</b></span>
                    <span><b>ORGANIZING</b></span>
                    <span><b>FORM</b></span>
                </div>
                <div className="scoredetail">
                    <span>RED FIRE</span>
                    <span><b>5</b></span>
                    <span><b>WON</b></span>
                    <span><b>LOST</b></span>
                    <span><b>TIE</b></span>
                    <span><b>ORGANIZING</b></span>
                    <span><b>FORM</b></span>
                </div>
            </div>
        </div>
    )
}

export default Scores
