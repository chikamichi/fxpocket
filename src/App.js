import React, { Component } from 'react'
import 'whatwg-fetch'

import Currency from './Currency'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currencies: []
    }
  }

  componentDidMount() {
    fetch(`https://api.fixer.io/latest`)
      .then((response) => response.json())
      .then((data) => {
        const currencies = Object.keys(data.rates)
        currencies.sort((a, b) => a.localeCompare(b))
        this.setState({currencies: currencies})
      })
  }

  render() {
    return (
      <div className="fxp">
      <Currency type='quote' currency='EUR' currencies={this.state.currencies} />
      <Currency type='counter' currency='USD' currencies={this.state.currencies} />
      </div>
    )
  }
}

export default App
