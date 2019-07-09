import React, { Fragment } from 'react';

function Song({ lyrics }) {
    if (lyrics.length === 0) return null;

    return (
        <Fragment>
            <h2>Letra Canción</h2>
            <p className="letra">{lyrics}</p>
        </Fragment>
    );
}

export default Song;
