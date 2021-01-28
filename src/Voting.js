import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import app from './base';
import "./Voting.css";
import uuid from "uuid/dist/v4"
import Hamburger from './Hamburger';
import NavigationBar from './NavigationBar';
import { Redirect, useHistory } from 'react-router';


const Voting = (props) => {
    const [characters, updateCharacters] = useState([]);
    // const [ip, updateIP] = useState("");
    const [isActive, setActive] = useState(false);
    const [Pop, setPop] = useState(false);
    const [PopItems, setPopItems] = useState(false);
    const [PopInputItems, setPopInputItems] = useState(false);
    const [PopInput, setPopInput] = useState(false);
    const [eventCode, setCode] = useState("");
    const [InputCode, setInputCode] = useState("");

    const {event} = props.match.params;
    // const [itemsFromBackend, setItemsFromBackent] = useState([]);
    // let columnsFromBackend = {
    //   [uuid()]: {
    //     name: "Requested",
    //     items: itemsFromBackend
    //   },
    //   [uuid()]: {
    //     name: "To do",
    //     items: []
    //   }
    // };
    const [columns, setColumns] = useState(null);
    const [itemLength, setItemLength] = useState([]);


    React.useEffect(() => {
        return app.firestore().collection('VotingEvents').doc(`${event}`).onSnapshot((snapshot, index) => {
                // updateCharacters(snapshot.data().teams);
                // setItemsFromBackent(snapshot.data().team);
                setActive(snapshot.data().isActive);
                let columnsFromBackend = {
                  ["first"]: {
                    name: "Requested",
                    items: snapshot.data().teams
                  },
                  ["second"]: {
                    name: "To do",
                    items: []
                  }
                };
                setCode(snapshot.data().code);
                setItemLength(snapshot.data().teams);
                setColumns(columnsFromBackend);

        });
    }, [event])

  


    const [details, setDetails] = useState("");
    const indices = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

    const history = useHistory();


    
    React.useEffect(() => {
        const getUserGeolocationDetails = () => {
            fetch(
                "https://geolocation-db.com/json/c0593a60-4159-11eb-80cd-db15f946225f"
            )
                .then(response => response.json())
                .then(data => setDetails(data.IPv4));
        };
       getUserGeolocationDetails();
    }, [])


    const saveData = async () => {
        try {
          if(details!=="" && InputCode===eventCode){
              await app.firestore().collection('votingUser').doc(`${details}`).set({
                  [`${event}`]: columns["second"].items
              }, {merge: true})
          } else {
            setPopInput(false);
            setPopInputItems(true);
            return 0;
          }
          setPopInput(false);
          setPop(true)
        } catch (error) {
            alert(error);
        }
    }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  const response = () => {
    setPop(false);
    history.goBack();
  }

  
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  return (
    <>
      <NavigationBar />
      <Hamburger title="VOTING" />
      {
          Pop===true ? (
              <div className="pop">
                  <div className="popContainer2" style={{position: 'fixed'}}>
                      <h4>Your Response has been saved</h4>
                      <button style={{backgroundColor: "#4E4E4E", color:"white", borderRadius:3, width:"20%"}} onClick={() => response()}>OK</button>
                  </div>
              </div>
          ) : (null)
      }
      {
          PopInputItems===true ? (
              <div className="pop">
                  <div className="popContainer2" style={{position: 'fixed'}}>
                      <h4>CODE IS INCORRECT!!!</h4>
                      <button style={{backgroundColor: "#4E4E4E", color:"white", borderRadius:3, width:"20%"}} onClick={() => setPopInputItems(false)}>OK</button>
                  </div>
              </div> 
          ) : (null)
      }
      {
          PopItems===true ? (
              <div className="pop">
                  <div className="popContainer2" style={{position: 'fixed'}}>
                      <h4>Please Rank All Teams</h4>
                      <button style={{backgroundColor: "#4E4E4E", color:"white", borderRadius:3, width:"20%"}} onClick={() => setPopItems(false)}>OK</button>
                  </div>
              </div>
          ) : (null)
      }
      {
          PopInput===true ? (
              <div className="pop">
                  <div className="popContainer2" style={{position: 'fixed'}}>
                      <h4>Enter the code</h4>
                      <input type="text" name="code" id="code" className="emailInput" style={{width: '70%'}} placeholder="Required" onChange={(e) => setInputCode(e.target.value)}/>
                      <button style={{backgroundColor: "#4E4E4E", color:"white", borderRadius:3, width:"20%"}} onClick={() => saveData()}>Submit</button>
                  </div>
              </div>
          ) : (null)
      }
          
      {
      isActive!==true?
      (<div style={{ display: "flex", flexDirection: "column", justifyContent: "stretch", alignItems: 'stretch', maxheight: "80vh"}}>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch", 
                  justifyContent: 'stretch'
                }}
                key={columnId}
              >
                <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                  {column.name==="Requested"?(<h3 style={{paddingLeft: '1.2em'}}>The Teams</h3>): (<h3 style={{paddingLeft: '1.2em'}}>Ranking</h3>)}
                </div>
                {
                  column.name==="Requested" ? (
                    <div style={{ margin: 'auto', minHeight: 100, width: '90%', padding: '0.6em', border: 'solid 2px #000000', borderRadius: '5px', overflow: 'auto'}}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              display: 'grid',
                              alignItems: 'center',
                              justifyItems: 'center',
                              gridRowGap: '6px',
                              gridColumnGap: '2px',
                              gridTemplateColumns: 'auto auto',
                              gridTemplateRows: 'none',
                              // background: snapshot.isDraggingOver
                              //   ? "lightblue"
                              //   : "lightgrey",
                              width: '100%',
                              height: '100%', 
                            }}
                            
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item}
                                  draggableId={item}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          // padding: 16,
                                          // margin: "0 0 8px 0",
                                          height: "32px",
                                          width: "161px",
                                          backgroundColor: snapshot.isDragging
                                            ? "#969393"
                                            : "#C4C4C4",
                                          color: "#000000",
                                          display: 'flex',
                                          justifyContent: 'center', 
                                          alignItems: 'center',
                                          borderRadius: '5px',
                                          ...provided.draggableProps.style
                                        }}
                                      >
                                        {item}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                    ) : (<div style={{ marginLeft: '3.5em', maxHeight: '50vh', position: 'relative' }}>
                      <div className="backgroundLayout" style={{position: 'absolute'}}>
                        {
                          itemLength.map((elt, index) => {
                            return (
                              <div style={{ display: 'flex', justifyContent: 'center', zIndex: '-10', alignItems: 'center', width: '313px', height: '50px', background: '#E2E2E2', margin: '8px', borderRadius: '5px', position: 'relative'}}><span style={{position: 'absolute', left: '-40px'}}>{indices[index]}</span></div>
                            )
                          })
                        }
                        
                        <div style={{display: 'flex', zIndex: '5', position:"relative", justifyContent: 'center', alignItems: 'center'}}>
                          <button className="submit" onClick={() => {
                            if(columns["first"].items.length===0) {
                              setPopInput(true)
                            } else {
                              setPopItems(true);
                            }
                          }}>Submit</button>
                        </div>
                      </div>
                      <div style={{position:"absolute"}}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (

                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? "969393"
                                  : "C4C4C4",
                                width: 250,
                                height: 450, 
                              }}
                              
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item}
                                    draggableId={item}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelect: "none",
                                            height: "50px",
                                            width: "313px",
                                            backgroundColor: snapshot.isDragging
                                              ? "#969393"
                                              : "#E2E2E2",
                                            borderRadius: '5px',
                                            display: 'flex', 
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: "#000000",
                                            ...provided.draggableProps.style,
                                            margin: 8,
                                          }}
                                        >
                                          {item}
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          );
                        }}
                      </Droppable>
                      </div>
                    </div>
                  )
                }
              </div>
            );
          })}
        </DragDropContext>
      </div>) : (
              <div style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                Voting session has not been activated
              </div>
              )
      }
    </>
  );

}

export default Voting
