import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import Axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import { useNavigate, createSearchParams } from "react-router-dom";
import React, { useEffect, useReducer } from "react";

function CreateView() {

  let PotObject = {
    pot_name: "",
    pot_organizer: "",
    contribution_amount: 0,
    participants: [],
  };

  console.log(PotObject);

  let initialState = {};

  const [state, dispatch] = useReducer(reducer, PotObject);

  function reducer(state, action) {
    switch (action.type) {
      case "field": {
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      }
      default:
        return state;
    }
  }

  function InputParticipant() {
    const handleFormChange = (index, event) => {
      let data =[...inputFields]
      data[index][event.target.name] = event.target.value;
      setInputFields(data);
    }
    const addFields = () => {
      let newfield = { name: '', date: '' }
  
      setInputFields([...inputFields, newfield])
  }
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)
}
    const [inputFields, setInputFields] = useState([
      {name: '', date: ''}
    ])
    return (
      <div className="Participant">
        <form>
          {inputFields.map((input, index) => {
            return (
              <div key={index}>
                <TextField
                  id="standard-basic"
                  label="Participant Name"
                  variant="standard"
                  required
                  name="name"
                  size="small"
                  value={input.name}
                  onChange={event => handleFormChange(index, event)}
                />
                <Button onClick={addFields}> + </Button>
                <Button onClick={() => removeFields(index)}> - </Button>
              </div>
            )
          })}
        </form>
      </div>
    );
  }

  const [participantNumber, setParticipantNumber] = useState('');

  function showPartcipantNumber() {
    console.log(participantNumber)
  }

  const [input, setInput] = useState(initialState);
  let inputName = 0;

  const handleUserInputChange = (e) => {
    const name = e.target.name;
    const newValue = e.target.value;
    setInput({ [name]: newValue });
  };

  return (
    <div>
      <h1>New Pot Details</h1>
      <div className="dataFields">
        <div className="potName">
          <TextField
            id="standard-basic"
            label="Money Pot Name"
            variant="standard"
            required
            size="small"
            onChange={(event) => {
              dispatch({
                type: "field",
                fieldName: "pot_name",
                payload: event.target.value,
              })
              console.log(PotObject.pot_name);
            }}
          />
        </div>
        <br></br>
        <div className="organizer">
          <TextField
            id="standard-basic"
            label="Organizer's name"
            variant="standard"
            required
            size="small"
            onChange={(event) => {
              dispatch({
                type: "field",
                fieldName: "pot_organizer",
                payload: event.target.value,
              });
            }}
          />
        </div>
        <br></br>
        <div className="contribution">
          <TextField
            id="standard-basic"
            label="Contribution Amount"
            variant="standard"
            required
            size="small"
            onChange={(event) => {
              dispatch({
                type: "field",
                fieldName: "contribution_amount",
                payload: event.target.value,
              });
            }}
          />
        </div>
        <div className="participantContainer">
          <InputParticipant/>
        </div>
        <br></br>
        <br></br>
        <Button variant="contained" onClick={dispatch}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default CreateView;
