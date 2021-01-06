import React from 'react'
import "./Scores.css"
import NavigationBar from './NavigationBar';
import Hamburger from './Hamburger';


const Rules = () => {
    return (
        <div>
            <NavigationBar /><Hamburger /><hr/>
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
            </div>
            <div className="footer">
                    <div>
                        <h3>Coordinators:</h3>
                        <h5>Rajendra Tapadia</h5>
                        
                    </div>
                    <div>
                        <h3>Contacts:</h3>
                        <h5>+919490233170</h5>
                    </div>
            </div>
        </div>
    )
}

export default Rules
