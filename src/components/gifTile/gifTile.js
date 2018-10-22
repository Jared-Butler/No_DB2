import React, { Component } from 'react';
import './gifTile.css';

class GifTile extends Component {
    render() {
        let { gifTilesArray, deleteTile } = this.props;

        let gifs = gifTilesArray.map((obj, index) => {
            return (
                <div key={index} className="display">
                    <img src={obj.gif[0]} alt="" />
                    <p >{obj.description} </p>

                    <div className="Buttons">

                        <button >Edit</button>

                        <button onClick={() => deleteTile(index)}>Delete</button>

                    </div>

                </div>
            )
        })
        return (
            <div className="gif-tile">

                {gifs}


            </div>
        )
    }
}

export default GifTile