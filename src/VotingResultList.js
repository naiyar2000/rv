import React, { useState } from 'react'

const VotingResultList = ({teams, elt, index, points}) => {


    const [pointsArray, setPointsArray] = useState([]);

    const indices = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]


    React.useEffect(() => {
        let temp = [];
        teams.forEach((elt, index1) => {
            if(points[`${elt}`]!==undefined){
                temp.push(points[`${elt}`]);
            }
        })
        temp.sort(function(a, b){return b-a});
        setPointsArray(temp);
    }, [teams, points])

    return (
        pointsArray.length!==0 ? (pointsArray.map((elt, index) => {
            return (
                <div className="teamList">
                    <h4 style={{width: '2em', display: 'inline'}}>{indices[index]}</h4>
                    <div className="listPart">
                        <h4>{points[`${elt}`]}</h4>
                    </div>     
                    <span>Points: {elt}</span>  
                </div>
            )
        })) : (null)
    )
}

export default VotingResultList
