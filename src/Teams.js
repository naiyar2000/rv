import React from 'react'
import NavigationBar from './NavigationBar';
import "./Teams.css"


const Teams = () => {
    return (
        <div>
            <NavigationBar /><hr/>
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
