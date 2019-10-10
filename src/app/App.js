import React, {Component} from 'react';
import './App.scss';

import Cursor from '../buildings/cursor'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beerDrinked: 0,
      quantToBuy: 1
    }
  }

  updateAfterBuy = (objReceived) => {
    let currentBeerDrinked = this.state.beerDrinked - objReceived;
    this.setState({beerDrinked: currentBeerDrinked})
  }

  clickDrinkBeer = () => {
    let num = this.state.beerDrinked
    this.setState({beerDrinked: ++num})
  }

  changeQuantOne = () => this.setState({quantToBuy: 1})

  changeQuantTen = () => this.setState({quantToBuy: 10})

  changeQuantHundred = () => this.setState({quantToBuy: 100})

  render() {
    return (
      <div id="App">
        <div className='clicker'>
          <div>
            <h1>Beer Drinked {this.state.beerDrinked}</h1>
            <button name='beer' type='button' onClick={this.clickDrinkBeer}>Beer</button>
          </div> 
        </div>
        <div className='upgrade'>
          <h1>Store</h1>
          <div>
            <h3>Upgrades</h3>
          </div>
          <div>
            <div className='buildingQuant'>
              <div><h3>Buildings</h3></div>
              <div>
                <span onClick={this.changeQuantOne} className={this.state.quantToBuy === 1 ? 'current' : null}>1</span>
                <span onClick={this.changeQuantTen} className={this.state.quantToBuy === 10 ? 'current' : null}>10</span>
                <span onClick={this.changeQuantHundred} className={this.state.quantToBuy === 100 ? 'current' : null}>100</span>
              </div>
            </div>
            <Cursor currentBeerDrinked={this.state.beerDrinked} parentCallback={this.updateAfterBuy}/>
          </div>
        </div>
        <div className='version'>
          <span>v0.001 - alpha</span>
        </div>    
      </div>
    );
  }
}
