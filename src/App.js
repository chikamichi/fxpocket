import React, { Component } from 'react'

import Currency from './Currency'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="fxp">
        <Currency type='quote' currency='EUR' />
        <Currency type='counter' currency='USD' />
      </div>
    )
  }
}

export default App
