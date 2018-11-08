

 let Function = (props) => {
    
   return props.index
    
}

export default Function















/*  
import React, { Component } from 'react';
import './gifTile.css';
import Delete from './../delete/delete';

class GifTile extends Component {
    render() {console.log("Hey");
        let { gifTilesArray, deleteTile } = this.props;

        let gifs = gifTilesArray.map((obj, index) => {
            return (
                <div key={index} className="display">
                    <img src={obj.gif} alt="" />
                    <p >{obj.description} </p>

                    <div className="Buttons">

                        <button >Edit</button>

                       <Delete 
                       obj={this.props}
                       deleteTile={this.props.deleteTile} />

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
*/