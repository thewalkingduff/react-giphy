import React, { useEffect, useState } from 'react';
import process.env from "react-dotenv";
import axios from 'axios';



const GifHooks = () => {
    const [gifs, setGifs] = useState([])
    const [savedGifs, setSavedGifs] = useState([])
    const [gifInput, setGifInput] = useState('')


    useEffect(() => {
        const savedGifs = localStorage.getItem('savedGifs')

        if (savedGifs) setSavedGifs(JSON.parse(savedGifs))
    }, [])

    const handleInput = (event) => {
        setGifInput(event.target.value);
    }

    const handleRemoveGif = (index) => {
        const newArray = [...savedGifs];

        newArray.splice(index, 1);

        setSavedGifs(newArray)
        localStorage.setItem('savedGifs', JSON.stringify(newArray))

    }

    const handleSaveGif = (gif) => {
        const newArray = [...savedGifs, gif]

        setSavedGifs(newArray)
        localStorage.setItem('savedGifs', JSON.stringify(newArray))
    }

    const handleSearchGifs = async () => {
        if (!gifInput) return;

        const MY_KEY = process.env.REACT_APP_API_URL

        const res = await axios.get(`https://api.giphy.com/v1/gifs/search?&q=${gifInput}&api_key=${MY_KEY}`)

        console.log(res.data.data)

        setGifs(res.data.data)
    }

    return (
        <div>
            <h1>My <span style={{ color: '#FFE62E' }}>Fav</span> GIPHYs</h1>

            <div className='fav-gifs'>

                {savedGifs.map((gif, index) => {
                    console.log(gif)
                    return (
                        <div key={index} className="single-fav-gif">
                            <img src={gif.images.fixed_width.url} alt=' ' />
                            <button className="save-remove-button" onClick={() => handleRemoveGif(index)} >Remove</button>
                        </div>
                    )
                })}
            </div>

            <section className='search-section'>
                <h2>SEARCH GIPHYS HERE!</h2>
                <input onChange={handleInput} value={gifInput} />
                <button className="search-button" onClick={handleSearchGifs}>SEARCH</button>
            </section>


            <div className='searched-gifs'>
                {gifs.map((gif, index) => {
                    return (
                        <div key={index} className="single-search-gif">
                            <img src={gif.images.fixed_width.url} />
                            <button className="save-remove-button" onClick={() => handleSaveGif(gif)}>Save</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default GifHooks
