import React, { useState } from 'react'

const VotingResultList = ({points,user}) => {


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
                <div className="teamList" key={elt} style={{paddingLeft:0, paddingRight:0}}>
                    <h4 style={{width: '2em', display: 'inline', padding:0, marginRight:0}}>{indices[index]}</h4>
                    <div className="listPart" style={{width:"83%"}}>
                        <h4>{elt}</h4>
                    </div>  
                    {user===false?(<span>Points: {point}</span>) : (null)}
                </div>
            )
        })) : (null)
        )
}

export default VotingResultList
