import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../index.css"

export default function ContentCard() {

    const [weather, setWeather] = useState([]);
    const [location, setLocation] = useState("");
    const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=yes&alerts=yes`)
                setWeather(response.data.forecast.forecastday);
            } catch (err) {
                console.log("hata oluştu");
            }
        }
        if (location)
            fetchData();
    }, [location])
    const handleKeyPress = e => {
        if (e.key === "Enter") {
            setLocation(e.target.value)
        }
    }
    
    return (
        <div className="main-container">
            <div className="text-content">
                <h2>Hava Durumu Uygulaması</h2>
                <input onKeyDown={handleKeyPress} type="text" placeholder="Şehir giriniz ve enter'a basınız" />
            </div>
            <div className="cards">
                {
                    weather.map((cv,index)=>{
                        return <div className='card' key={index}>
                            <h3>{cv.date} </h3>
                            <p>{cv.day.avgtemp_c}°C</p>
                            <p>{cv.day.condition.text}</p>
                            <div className='image'>
                            <img src={cv.day.condition.icon} /> 
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}