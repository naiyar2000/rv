import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import app from './base';
import "./Voting.css";
import Hamburger from './Hamburger';
import NavigationBar from './NavigationBar';
import { Redirect, useHistory } from 'react-router';


const Voting = (props) => {
    const [characters, updateCharacters] = useState([]);
    // const [ip, updateIP] = useState("");
    const [isActive, setActive] = useState(false);
    const [Pop, setPop] = useState(false);

    const {event} = props.match.params;

    React.useEffect(() => {
        return app.firestore().collection('VotingEvents').doc(`${event}`).onSnapshot(snapshot => {
                updateCharacters(snapshot.data().teams);
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
            if(details!==""){
                await app.firestore().collection('votingUser').doc(`${details}`).set({
                    [`${event}`]: characters
                }, {merge: true})
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

  return (
    <div>
      <NavigationBar />
      <Hamburger title="VOTING" />
      {
                Pop===true ? (
                    <div className="pop">
                        <div className="popContainer" style={{border: 'solid 2px #000000', borderRadius: '10px', padding: '1em'}}>
                            <h3>Your Response has been saved</h3>
                            <button onClick={() => response()} style={{padding: '1em', marginTop: '1.5em'}}>OK</button>
                        </div>
                    </div>
                ) : (null)
            }
      {
          isActive===true ? (
            <div className="App">
            <header className="App-header">
                <div className="parts">
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                  {(provided) => (
                    <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                      {characters.map((elt, index) => {
                        return (
                          <Draggable key={elt} draggableId={elt} index={index}>
                            {(provided) => (
                              <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <div className="indice">{indices[index]}</div>
                                <p>
                                  { elt }
                                </p>
                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
              <button className="submit" onClick={() => saveData()}>Submit</button>
              </div>
            </header>
          </div>
          ) : (
              <div style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                Voting session has not been activated
              </div>
          )
      }
    </div>
  );
}

export default Voting
