

import React from "react";
import { useState, useRef } from "react";
import "./Weather.css";
import { BsCloudSunFill } from 'react-icons/bs';
import { FaCity } from 'react-icons/fa';
import Modal from './Modal';
import "./Modal.css";
import Image from './sun.png';


function Weather () {

    const [searchInput, setSearchInput] = useState("");
    const [responseObj, setResponseObj] = useState({});
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState(false);
    const [is404, setIs404] = useState(false);

    const key = "83afacdf03fb70cfcd80d1dda80c1958";
    
    //Fetching forecast from openweathermapAPI 
    const getForeCast = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=imperial&APPID=${key}`)
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            setResponseObj(res);
            setModal(true)
            // if city not found or city error 
            if (res.cod === "400" || res.cod === "404") {
                setIs404(true);
                setSearch(false);
            } else {
                setIs404(false);
                setSearch(true);
            }

        })
    }

    const validateModal = () => {
        return ( 
        <>
        {modal ? <Modal temp={responseObj.main.temp} 
        humidity={responseObj.main.humidity}
        max={responseObj.main.temp_max}
        min={responseObj.main.temp_min}
        feels_like={responseObj.main.feels_like}
        closeModal={setModal}/> : null}
        </>
        );
    }

    return (        
        <>
        <div className="homePage">
            <img className="background-image" src={Image}></img>
            <div className="guts">
                <h2 className="h2">Check the weather below <BsCloudSunFill/></h2>
                <h1 className="h1"> Type in your city/state <FaCity/> </h1>
                <input onKeyPress={(e)=> {
                    if (e.key === "Enter") {
                        console.log("HITTING ENTER");
                        setSearchInput(e.target.value);
                        getForeCast();
                    }
                    if (e.keyCode === 27) {
                        console.log("esc");
                    }
                }} value={searchInput} onChange={(e)=> {setSearchInput(e.target.value)}} className="input-box" placeholder="Enter city..."></input>
                <button className="btn" onClick={getForeCast}>Get Forecast</button>
                {/* MODAL */}
                
                {search ? validateModal() : null}
                {is404 ? <p style={{ fontSize:"30px", fontWeight:"bold", color:"black", textAlign:"center"}}>Please enter a valid State/City</p> : " "}

                {/* MODAL */}
            </div>
        </div>
        </>   
    )
}


export default Weather;