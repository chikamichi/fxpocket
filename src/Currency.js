import React from 'react'
import PropTypes from 'prop-types'

class Currency extends React.Component {
  onAmountEdited(event) {
    this.props.onAmountEdited({
      amount: event.target.value,
      currency: this.props.currency
    })
  }

  render() {
    if (!this.props.currencies.length) {
      return <p>loading…</p>
    }
    const currencies = this.props.currencies.map((currency) =>
      <option className='fxp-currency__list-item' value={currency} key={currency}>{currency}</option>
    )
    return (
      <div className={`fxp-currency  fxp-currency--${this.props.type}`}>
        <select value={this.props.currency} className='fxp-currency__list'>
          {currencies}
        </select>
        <div className='fxp-currency__result'>
          <input type='text' className='fxp-currency__amount' onChange={this.onAmountEdited.bind(this)}/>
          <span className='fxp-currency__label'>{this.props.currency}</span>
        </div>
      </div>
    )
  }
}

Currency.propTypes = {
  type: PropTypes.oneOf(['quote', 'counter']).isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array.isRequired,
  onAmountEdited: PropTypes.func.isRequired
}

export default Currency
