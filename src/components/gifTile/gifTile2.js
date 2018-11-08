import React, { Component } from 'react';
import axios from 'axios';
import './gifTile.css';
import Function from './../delete/function';

class GifTile extends Component {
    constructor(){
        super();
        this.state={
           description:''
        }

        this.handleSave = this.handleSave.bind(this);
    }

// This needs to pass the edit change to the server to avoid the re-rendering loop.
    handleEdit = async (i) => {
        let editTrigger = await axios.put(`/api/edit/${i}/${"true"}`);
        
            this.setState({
                description:this.props.gifTilesArray.slice(i,i+1)[0].description
            }, () => {this.props.displayTile()} );

        return(
            editTrigger
            
        )
    }


    exitEdit = async (i) => {
        let exitEditTrigger = await axios.put(`/api/edit/${i}/${"false"}`);

        this.setState( {
                description:''
            }, () => {this.props.displayTile()} );

        return(
            exitEditTrigger
            
        )
    }

   async handleSave(i){
        const { description } = this.state;
        console.log(description);
        await axios.put(`/api/desc/${i}`, description);
        await this.exitEdit(i)

    }





    render() {
        // console.log("Hey");
        let { gifTilesArray, deleteTile } = this.props;

        let gifs = gifTilesArray.map((obj, index) => {
            if(this.props.gifTilesArray[index].edit === true){
                //return a smaller version of the search bar here
               return( <div key={index} className='editDisplay'>
                    <img src={obj.gif}/>
                    <input placeholder='Description' onChange={
                        (e) => this.setState({description: e.target.value})
                    }/>
                    <button onClick={() => this.handleSave(index)} >Save</button>
                    <button onClick={() => {this.exitEdit(index)}}>Cancel</button>

                </div>)

            }

            else {return (
                <div key={index} className="display">
                    <img src={obj.gif} alt="" />
                    <p >{obj.description} </p>

                    <div className="Buttons">

                        <button onClick={() => this.handleEdit(index)}>Edit</button>

                        <button onClick={() => deleteTile(index)}>Delete</button>
                       <p> ID:<Function index={index}/></p>

                    </div>

                </div>
            )}
        })

        
        return (
            <div className="gif-tile">

                {gifs}


            </div>
        )
    }
}

export default GifTile