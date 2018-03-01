import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import OptionsTable from './OptionsTable.jsx';
import Images from './Images.jsx';
import Reboot from 'material-ui/Reboot';
import ButtonAppBar from './AppBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = { 
        houseData: {},
        houseImages: [],
        availableHouses: [],
        houseId: [],
        guessOptions: []
      }
    this.getAllHouseIds = this.getAllHouseIds.bind(this);
    this.getRandomHouse = this.getRandomHouse.bind(this);
    this.getPicsById = this.getPicsById.bind(this);
    this.generateGuessOptions = this.generateGuessOptions.bind(this);
  }

  componentDidMount() {
    this.getAllHouseIds()
  }

  getAllHouseIds () {
      axios.get('/getAllIds')
      .then( (houseIds) => {
        this.setState({
          availableHouses: houseIds.data
        }, () => {
          console.log('new househouseIds array state ', this.state.availableHouses)
          this.getRandomHouse()
        })
      })
      .catch( (err) => {
        if (err) {
          console.log('err in getting random houseIds ', err);
        }
      })
  }

  getRandomHouse() {
    // console.log('houses available ', this.state.availableHouses.length);
    var numberAvailableHouses = this.state.availableHouses.length;
    var randomIndex = Math.floor(Math.random(0, numberAvailableHouses) * numberAvailableHouses)
    var randomZipId = this.state.availableHouses[randomIndex];
    this.getPicsById(randomZipId)
    this.getHouseDataById(randomZipId)
    // return randomIndex
  }

  getPicsById (houseId) {
    axios({
      method: 'get',
      url: '/getPicsById',
      params: { 
        houseId: houseId}
    })
    .then ( (pics) => {
      this.setState({
        houseImages: pics.data
      }, () => {
        console.log('new pics state ', this.state.houseImages)
      })
    }) 
    .catch( (err) => {
      console.log('err in client in getting pics by id ', err);
    })
  }

  getHouseDataById (houseId) {
    axios({
      method: 'get',
      url:'/getHouseDataById',
      params: {
        houseId: houseId
      }
    })
    .then( (houseData) => {
      this.setState({
        houseData: houseData.data
      }, () => {
        this.generateGuessOptions();
        console.log('new house data state ', this.state.houseData)
      })
    })
    .catch( (err)=> {
      console.log('err in getting house data in client ', err);
    })
  }

  generateGuessOptions( ) {
    var correctValue = Number(this.state.houseData.housevalue);
    var maxRange = correctValue*1.4;
    var minRange = correctValue*.6;
    var option1 = Math.floor( Math.random()*(maxRange - minRange) + minRange);
    var option2 = Math.floor( Math.random()*(maxRange - minRange) + minRange);
    var option3 = Math.floor( Math.random()*(maxRange - minRange) + minRange);
    var guessArray = [correctValue, option1, option2, option3];
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
    var shuffledOptions = shuffle(guessArray)
    this.setState({
      guessOptions: shuffledOptions
    }, () => {
      console.log('new options state ', this.state.guessOptions)
    })
  }
 
 
  render () {
    if (!this.state.houseImages.length) {
      var images = <div> </div>;
    } else {
      var images = <Images pics={this.state.houseImages} />
    }

    if(!this.state.guessOptions.length) {
      var options = <div></div>
    } else {
      var options = <OptionsTable 
                    choices={this.state.guessOptions} 
                    houseData={this.state.houseData} 
                    getNewHouse={this.getAllHouseIds} 
                    />
    }
    
    return (
    <div style ={{
      width: '100%'
    }}>
      <Reboot/>
        <ButtonAppBar />
        <div style={{
          height: '400px'
        }} >
        {images}
        </div>
        {options}

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));