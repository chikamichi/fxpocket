import React from 'react'
import PropTypes from 'prop-types'
import 'whatwg-fetch'

class Currency extends React.Component {
  constructor(props) {
    super(props)
    this.state = {...props, currencies: []}
  }

  componentWillMount() {
    fetch(`https://api.fixer.io/latest?base=${this.state.currency}`)
      .then((response) => response.json())
      .then((data) => {
        const currencies = [...Object.keys(data.rates), this.state.currency]
        currencies.sort((a, b) => a.localeCompare(b))
        this.setState({currencies: currencies})
      })
  }

  render() {
    const currencies = this.state.currencies.map((currency) =>
      <option className='fxp-currency__list-item' value={currency} key={currency}>{currency}</option>
    )
    return (
      <div className={`fxp-currency  fxp-currency--${this.state.type}`}>
        <select value={this.state.currency} className='fxp-currency__list'>
          {currencies}
        </select>
        <div className='fxp-currency__result'>
          <input type='text' className='fxp-currency__amount' />
          <span className='fxp-currency__label'>{this.state.currency}</span>
        </div>
      </div>
    )
  }
}

Currency.propTypes = {
  type: PropTypes.oneOf(['quote', 'counter']).isRequired,
  currency: PropTypes.string.isRequired
}

export default Currency
