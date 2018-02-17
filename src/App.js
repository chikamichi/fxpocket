import React, { Component } from 'react'

import Currency from './Currency'
import { INITIAL_STATE, convertAmounts } from './utils'
import Fixer from './fixer'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  onAmountEdited(payload) {
    this.setState({baseAmount: payload.amount})
  }

  onCurrencyEdited(payload, updateBaseAmount = true) {
    const idx = payload.uuid
    const newWidgetsState = [
      ...this.state.widgets.slice(0, idx),
      payload.currency,
      ...this.state.widgets.slice(idx+1)
    ]
    this.setState({
      widgets: newWidgetsState,
      baseAmount: updateBaseAmount ? payload.amount : this.state.baseAmount
    })
  }

  componentDidMount() {
    Fixer.connect().then(fixer => {
      this.fixer = fixer
      this.convertAmounts = convertAmounts(fixer)
      this.setState({init: true})
    })
  }

  render() {
    if (!this.state.init) return <div className='fxp-loading'></div>
    const currencies = this.fixer.currencies
    const cb = {
      onAmountEdited: this.onAmountEdited.bind(this),
      onCurrencyEdited: this.onCurrencyEdited.bind(this)
    }
    const amounts = this.convertAmounts({
      amount: this.state.baseAmount,
      currency: this.state.widgets[0],
      currencies: this.state.widgets
    })
    const widgets = this.state.widgets.map((currency, i) => {
      return <Currency
        key={i} // key is simply the position in this.state.widgets
        uuid={i}
        type='quote' // TODO: remove this type prop
        amount={amounts[currency]}
        currency={currency}
        currencies={currencies}
        onAmountEdited={cb.onAmountEdited}
        onCurrencyEdited={cb.onCurrencyEdited} />
    })
    return (
      <div className="fxp-app">
        {widgets}
      </div>
    )
  }
}

export default App
