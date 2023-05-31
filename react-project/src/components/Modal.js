import React from "react";
import "./Modal.css";
import {BsCloudSunFill} from 'react-icons/bs'

function Modal({ closeModal, temp, min, max, humidity, feels_like }) {

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              closeModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1> <BsCloudSunFill/> Weather</h1>
        </div>
        <div className="body">
          <p>Current temperature: {temp}</p>
          <p>Low: {min}</p>
          <p>High: {max}</p>
          <p>Humidity: {humidity} </p>
          <p>Feels like: {feels_like} </p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              closeModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;