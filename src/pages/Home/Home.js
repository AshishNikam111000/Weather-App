/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import Icon from './../../assets/images/logo.png';
import axios from 'axios';
import './Home.css';

import dust from './../../assets/images/dust.jpg';
import rain from './../../assets/images/rain.jpg';
import snow from './../../assets/images/snow.jpg';
import sun from './../../assets/images/sunny.jpg';
import cloud from './../../assets/images/cloud.jpg';
import haze from './../../assets/images/haze.jpg';
import { BsClouds, BsFillCloudRainHeavyFill, BsSnow, BsFillSunFill, BsFillCloudHazeFill } from 'react-icons/bs';

const Home = () => {

    const [input, setinput] = useState('');
    const [data, setdata] = useState([]);
    const [show, setshow] = useState(false);

    const current = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = `${current.getDate()} ${months[current.getMonth()]}, ${current.getFullYear()}`;

    const hour = current.getHours();

    const fahrenheitToCelsius = fahrenheit => Math.round((fahrenheit - 32) * 5 / 9);

    function GivenInput() {
        setinput(document.getElementById('city').value);
    }

    async function getData() {
        if (input == "") {
            alert("Input is empty.\rPlease give a valid input");
        }
        else {
            const response = await axios.get('https://api.openweathermap.org/geo/1.0/direct?', {
                params: {
                    q: input, appid: 'a8a4431bbc47f6fd2352a7cf892f6c66',
                }
            });

            try {
                const temp = await axios.get('https://api.openweathermap.org/data/2.5/weather?', {
                    params: {
                        lat: response.data[0].lat, lon: response.data[0].lon, appid: 'a8a4431bbc47f6fd2352a7cf892f6c66',
                    }
                });
                setdata(temp['data']);
                setshow(true);
            }
            catch {
                alert("Cannot find weather details of the given city. \rPlease check the spelling you entered, and try again.");
            }
        }

    }

    return (
        <>
            <center>
                <div className='container p-2 '>
                    <header className='lg:flex lg:flex-row items-center justify-between'>
                        <div className='flex flex-row items-center'>
                            <img className='w-24' src={Icon} alt='ICON' />
                            <div className='text-5xl font-light'>Forecaster</div>
                        </div>
                        <div className='text-lg'>
                            Forecaster is your friendly neighbourhood weather application.
                            It gives you a near-accurate forecast for your current city.
                        </div>
                    </header>
                </div><br />
                <div className='flex flex-row justify-center items-center'>
                    <input className='input text-xl' type="text" id='city' onChange={GivenInput} />
                    <button className='btn p-3 text-lg' onClick={getData}> Check </button>
                </div>
                <br />
                {
                    show ?
                        <>
                            {
                                data.weather[0].main == "Clouds" ?
                                    <img className='-z-10 fixed top-0 left-0 w-screen h-screen' src={cloud} alt="img" />
                                    : data.weather[0].main == "Rain" ?
                                        <img className='-z-10 fixed top-0 left-0 w-screen h-screen' src={rain} alt="img" />
                                        : data.weather[0].main == "Snow" ?
                                            <img className='-z-10 fixed top-0 left-0 w-screen h-screen' src={snow} alt="img" />
                                            : data.weather[0].main == "Sunny" || data.weather[0].main == "Clear" ?
                                                <img className='-z-10 fixed top-0 left-0 w-screen h-screen' src={sun} alt="img" />
                                                : data.weather[0].main == "Dust" ?
                                                    <img className='-z-10 fixed top-0 left-0 w-screen h-screen' src={dust} alt="img" />
                                                    : data.weather[0].main == "Haze" ?
                                                        <img className='-z-10 fixed top-0 left-0 w-screen h-screen' src={haze} alt="img" />
                                                        :
                                                        <></>
                            }
                            <div className='m-4 lg:m-8 text-xl font-sans text-left'>
                                <div className='text-3xl'>
                                    {data.name}, {data.sys.country}
                                </div>
                                {date}
                            </div>
                            <div className='otherdata text-xl font-sans flex flex-row justify-between text-left'>
                                <div>
                                    <div className='text-4xl'>
                                        {fahrenheitToCelsius(data.main.temp)}°C
                                    </div>
                                    <div className='ml-2'>
                                        Feels like: {fahrenheitToCelsius(data.main.feels_like)}°C
                                    </div>
                                </div>
                                <div className='weather flex flex-row text-3xl font-sans items-center justify-center'>
                                    <div className='mr-2'>
                                        {data.weather[0].main}
                                    </div>
                                    <div>
                                        {
                                            data.weather[0].main == "Clouds" ?
                                                < BsClouds className='weather w-16 h-16' />
                                                : data.weather[0].main == "Rain" ?
                                                    < BsFillCloudRainHeavyFill className='weather w-16 h-16' />
                                                    : data.weather[0].main == "Snow" ?
                                                        < BsSnow className='weather w-16 h-16' />
                                                        : data.weather[0].main == "Sunny" || data.weather[0].main == "Clear" ?
                                                            < BsFillSunFill className='weather w-16 h-16' />
                                                            : data.weather[0].main == "Haze" ?
                                                                < BsFillCloudHazeFill className='weather w-16 h-16' />
                                                                :
                                                                <></>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='text-xl font-sans text-left lg:flex lg:flex-row lg:justify-evenly lg:text-center lg:items-center'>
                                <div className='lg:flex lg:flex-col flex flex-row justify-between ml-4 mr-4 p-2'>
                                    <div> Humidity </div>
                                    <div className='text-3xl font-medium'> {data.main.humidity}% </div>
                                </div>
                                <div className='lg:flex lg:flex-col flex flex-row justify-between ml-4 mr-4 p-2'>
                                    <div> Pressure </div>
                                    <div className='text-3xl font-medium'> {data.main.pressure} Pha </div>
                                </div>
                                <div className='lg:flex lg:flex-col flex flex-row justify-between ml-4 mr-4 p-2'>
                                    <div> Visibility </div>
                                    <div className='text-3xl font-medium'> {data.visibility} kms</div>
                                </div>
                                <div className='lg:flex lg:flex-col flex flex-row justify-between ml-4 mr-4 p-2'>
                                    <div> Wind Speed </div>
                                    <div className='text-3xl font-medium'> {data.wind.speed} m/s</div>
                                </div>
                                <div className='lg:flex lg:flex-col flex flex-row justify-between ml-4 mr-4 p-2'>
                                    <div> Min temp </div>
                                    <div className='text-3xl font-medium'> {fahrenheitToCelsius(data.main.temp_min)}°C</div>
                                </div>
                                <div className='lg:flex lg:flex-col flex flex-row justify-between ml-4 mr-4 p-2'>
                                    <div> Max temp </div>
                                    <div className='text-3xl font-medium'> {fahrenheitToCelsius(data.main.temp_max)}°C</div>
                                </div>
                            </div>
                        </>
                        :
                        hour >= 17 && hour <= 19 ?
                            <div className='-z-10 fixed top-0 left-0 w-screen h-screen bg-orange-400'> </div>
                            : hour >= 6 && hour > 19 ?
                                <div className='-z-10 fixed top-0 left-0 w-screen h-screen bg-slate-600'> </div>
                                :
                                <div className='fixed top-0 left-0 w-screen h-screen bg-yellow-200 -z-10'> </div>
                }
            </center>
        </>
    )
}


export default Home;

