import React from 'react'
import NavigationBar from './NavigationBar'
import "./Results.css"

const Results = () => {
    let month = new Date().getMonth();
    let date = new Date().getDate();
    let year = new Date().getFullYear();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return (
        <div>
            <NavigationBar />
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
            </div>
        </div>
    )
}

export default Results
