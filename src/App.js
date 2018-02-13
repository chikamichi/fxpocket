import React, { Component } from 'react'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="fxp">
        <div className='fxp-currency fxp-currency--quote'>
          <select className='fxp-currency__list'>
            <option selected='selected'>EUR</option>
            <option>USD</option>
          </select>
          <div className='fxp-currency__result'>
            <input type='text' className='fxp-currency__amount'></input>
            <span className='fxp-currency__label'>EUR</span>
          </div>
        </div>
        <div className='fxp-currency fxp-currency--counter'>
          <select className='fxp-currency__list'>
            <option>EUR</option>
            <option selected='selected'>USD</option>
          </select>
          <div className='fxp-currency__result'>
            <input type='text' className='fxp-currency__amount'></input>
            <span className='fxp-currency__label'>USD</span>
          </div>
        </div>
      </div>
    )
  }
}

export default App
