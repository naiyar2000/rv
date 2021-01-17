import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import app from './base';
import "./Voting.css";
import Hamburger from './Hamburger';
import NavigationBar from './NavigationBar';


const Voting = (props) => {
    const [characters, updateCharacters] = useState([]);
    // const [ip, updateIP] = useState("");
    const [isActive, setActive] = useState(false);

    const {event} = props.match.params;

    React.useEffect(() => {
        return app.firestore().collection('VotingEvents').doc(`${event}`).onSnapshot(snapshot => {
                updateCharacters(snapshot.data().teams);
                setActive(snapshot.data().isActive);
        });
    }, [])


    const [details, setDetails] = useState("");
    const indices = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]


    
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
                await app.firestore().collection('votingUser').doc(`${details}`).update({
                    [`${event}`]: characters
                })
            }
            
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

  return (
    <div>
      <NavigationBar />
      <Hamburger title="VOTING" />
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
              <div>
                Voting session has not been activated
              </div>
          )
      }
    </div>
  );
}

export default Voting
