import React from 'react'
import NavigationBar from './NavigationBar';
import "./Teams.css"
import Hamburger from './Hamburger';



const Teams = () => {
    return (
        <div>
            <NavigationBar /><Hamburger title="TEAMS" /><hr/>
            <br/>
            <div className="selectionTeams">
                    <button>Members</button>
                    <button>Teams</button>
                    <button>Sports</button>
                    <button>Cultural</button>
            </div>
        </div>
    )
}


export default Teams
