import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import OptionsTable from './OptionsTable.jsx';
import Images from './Images.jsx';
import Reboot from 'material-ui/Reboot';
import ButtonAppBar from './AppBar.jsx';
import HintsButton from './HintsButton.jsx';
import HintTransition from './HintTransition.jsx';
import Button from 'material-ui/Button';
import RestartButton from './RestartButton.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = { 
        houseData: {},
        houseImages: [],
        availableHouses: [],
        viewedHouses: [],
        houseId: [],
        guessOptions: [],
        onHint: 0
      }
    this.getAllHouseIds = this.getAllHouseIds.bind(this);
    this.getRandomHouse = this.getRandomHouse.bind(this);
    this.getPicsById = this.getPicsById.bind(this);
    this.generateGuessOptions = this.generateGuessOptions.bind(this);
    this.resetHint = this.resetHint.bind(this);
    this.changeHint = this.changeHint.bind(this);
    this.resetHouses = this.resetHouses.bind(this);
  }

  componentDidMount() {
    this.getAllHouseIds();
    this.resetHint();
  }

  resetHouses() {
    this.setState({
      viewedHouses: []
    }, () => {
      this.getAllHouseIds();
    })
  }

  getAllHouseIds () {
    console.log('house data ', this.state.houseData);
      axios.get('/getAllIds')
      .then( (houseIds) => {
        this.setState({
          availableHouses: houseIds.data
        }, () => {
          var viewedHouses = this.state.viewedHouses.slice();
          var availableHousesToSplice = this.state.availableHouses.slice();
          viewedHouses.forEach( house => {
            availableHousesToSplice.splice( availableHousesToSplice.indexOf(house), 1 )
          })
          this.setState({     
            availableHouses: availableHousesToSplice
          }, ()=> {
            this.getRandomHouse()
          })
        })
      })
      .catch( (err) => {
        if (err) {
          console.log('err in getting random houseIds ', err);
        }
      })
  }

  getRandomHouse() {
    var numberAvailableHouses = this.state.availableHouses.length;
    var randomIndex = Math.floor(Math.random(0, numberAvailableHouses) * numberAvailableHouses)
    var randomZipId = this.state.availableHouses[randomIndex];
    this.getPicsById(randomZipId)
    this.getHouseDataById(randomZipId)
    var newViewedHouses = this.state.viewedHouses.slice()
    newViewedHouses.push(randomZipId)
    this.setState({
      viewedHouses: newViewedHouses
    },() => {
      
    })
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
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
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
    })
  }

  resetHint() {
    this.setState({
      onHint: 0
    })
  }

  changeHint() {
    this.setState({
      onHint: this.state.onHint + 1
    })
  }
 
  render () {
    if (!this.state.houseImages.length) {
      var images = <div> </div>;
    } else {
      var images = <Images pics={this.state.houseImages} houseData={this.state.houseData}  />
    }

    if(!this.state.guessOptions.length) {
      var options = <div></div>
    } else {
      var options = <OptionsTable 
                    choices={this.state.guessOptions} 
                    houseData={this.state.houseData} 
                    getNewHouse={this.getAllHouseIds} 
                    resetHint={this.resetHint}
                    />
    }

    if (this.state.availableHouses.length===0) {
      var resetGame = < RestartButton resetHouses={this.resetHouses} /> 
    } else {
      var resetGame = <div></div>
    }



    return (
    <div style ={{
      width: '100%'
    }}>
      {/* <Reboot/> */}

        <ButtonAppBar />
        <div style={{ height: '400px'}} >
        {images}
        </div>
        {options}
        < HintTransition 
          onHint={this.state.onHint} 
          changeHint={this.changeHint} 
          houseData={this.state.houseData}/>
          {resetGame}

    </div>)
  }
}

export default App;