import React, { useState } from 'react';
import styles from './Home.css';
import Icon from './../../assets/images/logo.png';
import storm from './../../assets/images/storm.jpg';
import rain from './../../assets/images/rain.jpg';
import snow from './../../assets/images/snow.jpg';
import sun from './../../assets/images/sunny.jpg';
import cloud from './../../assets/images/cloud.jpg';
import haze from './../../assets/images/haze.png';
import axios from 'axios';
import { BsClouds, BsFillCloudRainHeavyFill, BsSnow, BsFillSunFill, BsFillCloudHazeFill } from 'react-icons/bs';

const Home = () => {

    const [input, setinput] = useState('');
    const [data, setdata] = useState([]);
    const [show, setshow] = useState(false);

    const current = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = `${current.getDate()} ${months[current.getMonth()]}, ${current.getFullYear()}`;

    const hour = current.getHours();
    const minutes = current.getMinutes();

    const fahrenheitToCelsius = fahrenheit => (fahrenheit - 32) * 5 / 9;

    function GivenInput() {
        setinput(document.getElementById('city').value);
    }

    async function getData() {
        const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct?', {
            params: {
                q: input, appid: 'a8a4431bbc47f6fd2352a7cf892f6c66',
            }
        });

        const temp = await axios.get('https://api.openweathermap.org/data/2.5/weather?', {
            params: {
                lat: response.data[0].lat, lon: response.data[0].lon, appid: 'a8a4431bbc47f6fd2352a7cf892f6c66',
            }
        });
        setdata(temp['data']);
        setshow(true);
        console.log(temp['data']);
    }

    return (
        <>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.IconTitle}>
                        <img src={Icon} />
                        <div className={styles.title}>Forecaster</div>
                    </div>
                </header>
                <div>
                    Forecaster is your friendly neighbourhood weather application.
                    It gives you a near-accurate forecast for your current city.
                </div>
            </div><br />
            <center>
                <input className={styles.input} type="text" id='city' onChange={GivenInput} />
                <button className={styles.btn} onClick={getData}> Check </button>
                <br /><br />
            </center>
            {
                show ?
                    <>
                        {
                            data.weather[0].main == "Clouds" ?
                                <img className={styles.background} src={cloud} alt="img" />
                                : data.weather[0].main == "Rain" ?
                                    <img className={styles.background} src={rain} alt="img" />
                                    : data.weather[0].main == "Snow" ?
                                        <img className={styles.background} src={snow} alt="img" />
                                        : data.weather[0].main == "Sunny" ?
                                            <img className={styles.background} src={sun} alt="img" />
                                            : data.weather[0].main == "Storm" ?
                                                <img className={styles.background} src={storm} alt="img" />
                                                : data.weather[0].main == "Haze" ?
                                                    <img className={styles.background} src={haze} alt="img" />
                                                    :
                                                    <></>
                        }
                        <div className={styles.data}>
                            <div>
                                {data.name}, {data.sys.country}
                            </div>
                            {date}
                        </div>
                        <div className={styles.otherdata1}>
                            <div>
                                <h1>
                                    {fahrenheitToCelsius(data.main.temp)}°C <br />
                                </h1>
                                Feels like: {fahrenheitToCelsius(data.main.feels_like)}°C
                            </div>
                            <div className={styles.weather}>
                                <div>
                                    {data.weather[0].main}
                                </div>
                                <div>
                                    {
                                        data.weather[0].main == "Clouds" ?
                                            < BsClouds className={styles.weather} />
                                            : data.weather[0].main == "Rain" ?
                                                < BsFillCloudRainHeavyFill className={styles.weather} />
                                                : data.weather[0].main == "Snow" ?
                                                    < BsSnow className={styles.weather} />
                                                    : data.weather[0].main == "Sunny" ?
                                                        < BsFillSunFill className={styles.weather} />
                                                        : data.weather[0].main == "Haze" ?
                                                            < BsFillCloudHazeFill className={styles.weather} />
                                                            :
                                                            <></>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles.otherdata2}>
                            <div>Humidity
                                <div>
                                    {data.main.humidity}%
                                </div>
                            </div>
                            <div>Pressure
                                <div>{data.main.pressure}Pha</div>
                            </div>
                            <div>Visibility
                                <div> {data.visibility}kms</div>
                            </div>
                            <div>Wind Speed
                                <div> {data.wind.speed}m/s</div>
                            </div>
                            <div>Min temp
                                <div> {fahrenheitToCelsius(data.main.temp_min)}°C</div>
                            </div>
                            <div>Max temp
                                <div> {fahrenheitToCelsius(data.main.temp_max)}°C</div>
                            </div>
                        </div>
                    </>
                    :
                    hour >= 17 && hour <= 19 ?
                        <div className={styles.dusk}> </div>
                        : hour >= 6 && hour > 19 ?
                            <div className={styles.night}> </div>
                            :
                            <div className={styles.bright}> </div>
            }
        </>
    )
}


export default Home;

