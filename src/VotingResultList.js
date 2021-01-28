import React, { useState } from 'react'

const VotingResultList = ({points, user}) => {

    console.log(points);


    const [pointsArray, setPointsArray] = useState(null);

    const indices = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]


    React.useEffect(() => {
        console.log('hello therer')
        let sortable = Object.fromEntries(
            Object.entries(points).sort(([ ,a],[ ,b]) => a-b)
        );
        setPointsArray(sortable);
        console.log(sortable);
    }, [points])

    let temp = 0;
    let holderPoint;


    return (
        pointsArray!==null ? 
        (Object.entries(pointsArray).map(([elt, point], index) => {
            if(temp===0 && temp===index) {
                holderPoint = point;
                console.log(holderPoint)
            }
            if(point!==holderPoint) {
                ++temp;
                holderPoint = point;
            }

            return (
                <div className="teamList" key={elt} style={{paddingLeft:0, paddingRight:0}}>
                    <h4 style={{width: '2em', display: 'inline', padding:0, marginRight:0}}>{indices[temp]}</h4>
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
