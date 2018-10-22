import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import GifSearch from './components/gifSearch/gifSearch';
import GifTile from './components/gifTile/gifTile';

class App extends Component {
  constructor(){
    super();
    this.state = {
      searchInput:"",
      descInput:"",
      gifSearch:[],
      gifSelect:"",
      searchTile: {},
      gifsToDisplay: []
      
    }
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }


componentDidMount(){
  this.displayTile()
}


handleSearchInput(e){
  this.setState({
    searchInput: e.target.value
  })
  // console.log(this.state.searchInput)
}

handleDescInput = (e) => {
  this.setState({
    descInput: e.target.value
  })
  // console.log(this.state.descInput)
}

//send params in body
handleSearchButton = (e) => {
  // console.log("HandleSearchButton");
  // console.log(this.state.searchInput);
  const {searchInput} = this.state;
  axios.get(`/api/gif/${searchInput}`)
  .then((res) => {this.setState({
    gifSearch: res.data
  }); 
  // console.log(this.gifSearch)
}
  )
  .catch(err => console.log(err));
}

//this filters displayed gifs to only gif clicked.
selectGifs = (clickedGif) => {
  const { gifSearch } = this.state;
  let tempGif = gifSearch.filter( gif => gif === clickedGif)
  this.setState({gifSearch: tempGif,
                 gifSelect: tempGif})
}

//this saves only the filtered gif, the search param, and the description to an object and pushes it to the server to be returned and mapped out in the gif tile component.
createTile = (e) => {
  const { searchInput, descInput, gifSelect  } = this.state;
  // console.log(gifSelect)
  this.setState({searchTile:[{ search: searchInput, description: descInput, gif: gifSelect }], 
  }, function(){
    // console.log(this.state.searchTile);
    axios.post('/api/gif',this.state.searchTile)
    .then(this.setState({
      searchInput:"",
      descInput:"",
      gifSelect:"",
      gifSearch:[]
    }, () => this.displayTile() )
    // console.log("I ran")
    )
    
  }); 
 
}


//this will map all of the data to be displayed in the tiles.
displayTile = () => {
  axios.get('/api/gifs').then( (res) => {
    // console.log(res.data)
    this.setState({ gifsToDisplay: res.data })
  } )
}

//this pulls the search param from the object that's being passed through and passes it through as a search param
// updateTile = () => {
//   axios.put(`/api/gifs/${index}`)
// }

//this deletes the entire object containing the gif info from the array of objects found within the server.
deleteTile = (index) => {
  axios.delete(`/api/gifs/${index}`)
  .then(() => this.displayTile())
}



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Gif Picker</h3>
          <img className="headerGif" src="https://techcrunch.com/wp-content/uploads/2015/06/gifgif.gif?w=730&crop=1"/>
  
        </header>
        <div className="App-Body">
          <GifSearch
          handleSearchInput={this.handleSearchInput}
          handleDescInput={this.handleDescInput}
          handleSearchButton={this.handleSearchButton}
          gifsArray={this.state.gifSearch}
          selectGif={this.selectGifs}
          saveButton={this.createTile}
          />
           

          <GifTile
          gifTilesArray={this.state.gifsToDisplay}
          deleteTile={this.deleteTile}
          />
        </div>
      </div>
    );
  }
}

export default App;
