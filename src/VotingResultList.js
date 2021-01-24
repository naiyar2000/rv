import React, { useState } from 'react'

const VotingResultList = ({points}) => {


    const [pointsArray, setPointsArray] = useState(null);

    const indices = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]


    React.useEffect(() => {
        let sortable = Object.fromEntries(
            Object.entries(points).sort(([,a],[,b]) => a-b)
        );
        setPointsArray(sortable);
    }, [points])

    return (
        pointsArray!==null ? 
        (Object.entries(pointsArray).map(([elt, point], index) => {
            return (
                <div className="teamList" key={elt}>
                    <h4 style={{width: '2em', display: 'inline'}}>{indices[index]}</h4>
                    <div className="listPart">
                        <h4>{elt}</h4>
                    </div>     
                    <span>Points: {point}</span>  
                </div>
            )
        })) : (null)
        )
}

export default VotingResultList
