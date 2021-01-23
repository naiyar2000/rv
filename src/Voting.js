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

    const {event} = props.match.params;
    const [itemsFromBackend, setItemsFromBackent] = useState([
      // { id: uuid(), content: `${characters[0]}` },
      // { id: uuid(), content: `${characters[1]}` },
      // { id: uuid(), content: `${characters[2]}` },
      // { id: uuid(), content: `${characters[3]}` },
      // { id: uuid(), content: `${characters[4]}` }
    ]);
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


    React.useEffect(() => {
        return app.firestore().collection('VotingEvents').doc(`${event}`).onSnapshot((snapshot, index) => {
                // updateCharacters(snapshot.data().teams);
                setItemsFromBackent(snapshot.data().team);
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
                setColumns(columnsFromBackend);
                setActive(snapshot.data().isActive);
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
        // characters.forEach((elt, index) => {
        //     updateCharacters(oldcharacter => [...oldcharacter], elt.values[index]++);
        // })
        try {
            if(details!=="" && columns["first"].items.length===0){
                await app.firestore().collection('votingUser').doc(`${details}`).set({
                    [`${event}`]: columns["second"].items
                }, {merge: true})
            } else {
              console.log('remove all elements')
            }

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

  // return (
  //   <div>
      // <NavigationBar />
      // <Hamburger title="VOTING" />
      // {
      //           Pop===true ? (
      //               <div className="pop">
      //                   <div className="popContainer2" style={{position: 'relative'}}>
      //                       <h4>Your Response has been saved</h4>
      //                       <button style={{backgroundColor: "#4E4E4E", color:"white", borderRadius:3, width:"20%"}} onClick={() => response()}>OK</button>
      //                   </div>
      //               </div>
      //           ) : (null)
      //       }
      // {
      //     isActive===true ? (
      //       <div className="App">
      //         <div className="headerVoting">
      //               <h2>{event}</h2>
      //               <h5>{new Date().toDateString()}</h5><br/>
      //         </div>
      //           <div className="parts">
      //             <DragDropContext onDragEnd={handleOnDragEnd}>
      //               <Droppable droppableId="characters">
      //                 {(provided) => (
      //                   <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
      //                     {characters.map((elt, index) => {
      //                       return (
      //                         <Draggable key={elt} draggableId={elt} index={index}>
      //                           {(provided) => (
      //                             <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      //                               <div className="indice">{indices[index]}</div>
      //                               <p>
      //                                 { elt }
      //                               </p>
      //                             </li>
      //                           )}
      //                         </Draggable>
      //                       );
      //                     })}
      //                     {provided.placeholder}
      //                   </ul>
      //                 )}
  //                   </Droppable>
  //                 </DragDropContext>
                  // <button className="submit" onClick={() => saveData()}>Submit</button>
  //             </div>
            
  //         </div>
          // ) : (
          //     <div style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          //       Voting session has not been activated
          //     </div>
  //         )
  //     }
  //   </div>
  // );

  
  
  
  
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
    
      {
      isActive===true?
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "stretch", alignItems: 'stretch', maxheight: "80vh", overflow: 'auto' }}>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8, maxHeight: '50vh', overflow: 'auto' }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 100
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
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
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
              </div>
            );
          })}
        </DragDropContext>
        <button className="submit" onClick={() => saveData()}>Submit</button>
      </div> : (
              <div style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                Voting session has not been activated
              </div>
              )
      }
    </>
  );

}

export default Voting
