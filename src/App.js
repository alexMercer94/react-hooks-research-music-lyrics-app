import React, { useState, useEffect, Fragment } from 'react';
import Form from './components/Form';
import axios from 'axios';
import Song from './components/Song';
import Info from './components/Info';

function App(props) {
    // Utilizar useState con 3 states diferentes
    const [artist, addArtist] = useState('');
    const [lyrics, addLyrics] = useState([]);
    const [info, addInfo] = useState({});

    // Metodo para consultar la API de letras de canciones
    const fetchAPILyrics = async search => {
        const { artist, song } = search;
        const URL = `https://api.lyrics.ovh/v1/${artist}/${song}`;

        // consultar la api
        const result = await axios(URL);

        // Almacenar el artista quw se buscó
        addArtist(artist);

        // Almacenar la letra en el state
        addLyrics(result.data.lyrics);
    };

    // Metod para consultar la API de información
    const consultarAPIArtisInfo = async () => {
        if (artist) {
            const URL = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;

            const result = await axios(URL);
            addInfo(result.data.artists[0]);
        }
    };

    useEffect(() => {
        consultarAPIArtisInfo();
    }, [artist]);

    return (
        <Fragment>
            <Form fetchAPILyrics={fetchAPILyrics} />

            <div className="row">
                <div className="col-md-6">
                    <Info info={info} />
                </div>
                <div className="col-md-6">
                    <Song lyrics={lyrics} />
                </div>
            </div>
        </Fragment>
    );
}

export default App;
