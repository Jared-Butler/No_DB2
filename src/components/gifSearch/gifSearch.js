import React, { Component } from 'react';
import './gifSearch.css';


class GifSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: ''
        }
    }


    //update state.

    handleSearchState = (e) => {
        console.log(this.state.searchInput);
        this.setState({
            searchInput: e.target.value
        })
    }

    render() {
        let { gifsArray, selectGif, saveButton } = this.props;

        let images = gifsArray.map((image, index, e) => {
            return <img key={index} src={image} alt="https://techcrunch.com/wp-content/uploads/2015/06/gifgif.gif?w=730&crop=1" onClick={() => selectGif(image)} />
            //filter and set state here.
        });


        // console.log(images)

        return (
            <div className="gif-search">
                <div className="gifs">
                    {images}
                </div>
                <div className="textBoxes">
                    <input type="text" placeholder="Search" onChange={this.props.handleSearchInput} onKeyDown={(event) => { if (event.key === "Enter") { this.props.handleSearchButton() } }} />
                    <button onClick={this.props.handleSearchButton}>Submit</button>

                    <input type="text" placeholder="Type a Description" onChange={this.props.handleDescInput}
                        onKeyDown={(event) => { if (event.key === "Enter") { saveButton() } }}
                    />
                    <button onClick={saveButton}>Save</button>

                    <input type="text" placeholder="Random Text Box" onChange={this.handleSearchState}  />
                </div>
            </div>
        )
    }
}

export default GifSearch;