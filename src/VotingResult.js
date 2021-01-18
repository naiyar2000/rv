import React, { useState } from 'react';
import app from './base';
import "./VotingResult.css";
import { Bar } from 'react-chartjs-2'
import Hamburger from './Hamburger';

const VotingResult = (props) => {

    const [votingData, setVotingData] = useState([]);
    const [teams, setTeams] = useState([]);
    const [teamPos, setTeamPos] = useState({});
    const [seeGetData, setData] = useState(false);
    const [popVisible, setPop] = useState(false);
    const [newTeam, setnewTeam] = useState("");
    const [addTeam, setaddTeam] = useState(true);
    const [removeButton, setbuttom] = useState(true);
    const [teamSelected, setTeam] = useState(0);
    
    const { event } = props.match.params;

    const indices = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                await app.firestore().collection('votingUser').onSnapshot(snapshot => {
                    setVotingData(snapshot.docs);
                })
                await app.firestore().collection('VotingEvents').doc(`${event}`).onSnapshot(snapshot => {
                    setTeams(snapshot.data().teams);
                })
            } catch (error) {
                alert(error);
            }
        }
        fetchData()
    }, [])

    React.useEffect(() => {

        for(let i of teams) {
            setTeamPos(old => {
                return {...old, [`${i}`]: [0, 0, 0, 0, 0, 0, 0, 0]}
            })
        }
        setData(true);
    }, [teams])

    const getData = () => {
        votingData.forEach((vote, index1) => {
            // console.log(teamPos[`${vote.data().teams[0]}`][index1])
            if(vote.data()[`${event}`]) {
                vote.data()[`${event}`].forEach((elt, index2) => {
                    let temp = teamPos[`${elt}`];
                    temp[index2]++;
                    setTeamPos(old => {
                        return {...old, [`${elt}`]: temp}
                    })
                    setData(false)
                })
            }
            setData(false);
        })
    }

    // function BarGroup(props) {
    //     let barPadding = 2
    //     let barColour = '#348AA7'
    //     let widthScale = d => d * 10
      
    //     let width = widthScale(props.d.value)
    //     let yMid = props.barHeight * 0.5
        
    //     return <g className="bar-group">
    //       <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
    //       <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
    //       <text className="value-label" x={width- 8} y={yMid} alignmentBaseline="middle" >{props.d.value}</text>
    //     </g>
    //   }

    //   const [barstate, setBar] = useState({
    //     data: [
    //       { name: 'Mon', value: 20 },
    //       { name: 'Tue', value: 40 },
    //       { name: 'Wed', value: 35 },
    //       { name: 'Thu', value: 50 },
    //       { name: 'Fri', value: 55 },
    //       { name: 'Sat', value: 40 },
    //       { name: 'Sun', value: 30 }
    //     ]
    //   })
    
      
    //   class BarChart extends React.Component {
    //     state = {
    //       data: [
    //         { name: 'Mon', value: 20 },
    //         { name: 'Tue', value: 40 },
    //         { name: 'Wed', value: 35 },
    //         { name: 'Thu', value: 50 },
    //         { name: 'Fri', value: 55 },
    //         { name: 'Sat', value: 40 },
    //         { name: 'Sun', value: 30 }
    //       ]
    //     }
      
    //     render() {
    //       let barHeight = 30
              
    //       let barGroups = this.state.data.map((d, i) => <g transform={`translate(0, ${i * barHeight})`}>
    //                                                       <BarGroup d={d} barHeight={barHeight} />
    //                                                     </g>)                         
          
    //       return <svg width="800" height="300" >
    //         <g className="container">
    //           <text className="title" x="10" y="30">Week beginning 9th July</text>
    //           <g className="chart" transform="translate(100,60)">
    //             {barGroups}
    //           </g>
    //         </g>
    //       </svg>
    //     }
    //   }
      
    //   ReactDom.render(
    //     <BarChart />,
    //     document.getElementById('app')
    //   )

    // let barHeight = 30
    // let barGroups = barstate.data.map((d, i) => <g transform={`translate(0, ${i * barHeight})`}>
    //                                                       <BarGroup d={d} barHeight={barHeight} />
    //                                                     </g>)   


    return (

        <div>
            <Hamburger title="Result" />
            <div className="ResultArea">
                <h2>{event}</h2>
                {
                        teams.length!==null ? (teams.map((elt, index) => {
                            return (
                                <div className="teamList">
                                    {/* <h4 style={{width: '2em'}}>{indices[index]}</h4> */}
                                    <div className="listPart">
                                        <h4>{elt}</h4>
                                    </div>
                                </div>
                            )
                        })) : (null)
                    }
                <h3>Group Wise Analysis</h3>
                <select name="group" id="group" value={teamSelected} onChange={(e) => setTeam(e.target.value)}>
                    {
                        teams.map((elt, index) => {
                            return (
                                <option value={index} key={elt}>{elt}</option>
                            )
                        })
                    }
                </select>
                <Bar 
                    data={{
                        labels: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
                        datasets: [
                            {
                                label: 'hello',
                                data: teamPos[`${teams[teamSelected]}`]
                            }
                        ]
                    }}
                />
                {
                    votingData.length!==0&&teams.length!==0&&seeGetData===true?(
                        <button onClick={() => getData()}>Get Data</button>
                    ):(null)
                }
            </div>
        </div>
              
                                
          
        //    <svg width="800" height="300" >
        //     <g className="container">
        //       <text className="title" x="10" y="30">Week beginning 9th July</text>
        //       <g className="chart" transform="translate(100,60)">
        //         {barGroups}
        //       </g>
        //     </g>
        //   </svg>
    )
    
}

export default VotingResult
