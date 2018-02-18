import React from 'react'
import PropTypes from 'prop-types'
import coinify from 'coinify'

import { currencyWording } from './utils'

class Currency extends React.Component {
  onAmountEdited(event) {
    this.props.onAmountEdited({
      uuid: this.props.uuid,
      amount: event.target.value
    })
  }

  onCurrencyEdited(event) {
    this.props.onCurrencyEdited({
      uuid: this.props.uuid,
      amount: this.props.amount,
      currency: event.target.value
    })
  }

  render() {
    const currencies = this.props.currencies.map((currency) =>
      <option
        key={currency}
        className='fxp-currency__list-item'
        value={currency}>
          {currencyWording(currency)}
      </option>
    )
    const currencySymbol = coinify.symbol(this.props.currency)
    return (
      <div className='fxp-currency'>
        <div className='fxp-currency__result'>
          <input
            type='text'
            className='fxp-currency__amount'
            onChange={this.onAmountEdited.bind(this)}
            value={this.props.amount || ''}
            // ref={input => input && this.props.uuid === 0 && input.focus()}
          />
          <span className='fxp-currency__label'>{currencySymbol}</span>
        </div>
        <select value={this.props.currency} className='fxp-currency__list' onChange={this.onCurrencyEdited.bind(this)}>
        {currencies}
        </select>
      </div>
    )
  }
}

Currency.propTypes = {
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array.isRequired,
  onAmountEdited: PropTypes.func.isRequired,
  onCurrencyEdited: PropTypes.func.isRequired
}

export default Currency
