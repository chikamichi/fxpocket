import React, { Component } from 'react'

import Currency from './Currency'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="fxp">
        <Currency />
        <Currency />
      </div>
    )
  }
}

export default App
