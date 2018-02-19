import React from 'react'
import PropTypes from 'prop-types'
import coinify from 'coinify'

import { currencyWording } from './utils'

/**
 * **Currency — a presentational component mapped to a specific currency & amount.**
 *
 * A <Currency /> instance is refered to as a "currency widget".
 */
class Currency extends React.Component {
  /**
   * User edited the widget's amount.
   *
   * Delegates to the matching callback provided as `props.onAmountEdited`.
   *
   * @see {@link App#onAmountEdited}
   * @see https://reactjs.org/docs/events.html
   *
   * @param {SyntheticEvent} event - "change" event
   */
  onAmountEdited(event) {
    this.props.onAmountEdited({
      uuid: this.props.uuid,
      amount: event.target.value
    })
  }

  /**
   * User edited the widget's currency.
   *
   * Delegates to the matching callback provided as `props.onCurrencyEdited`.
   *
   * @see {@link App#onCurrencyEdited}
   * @see https://reactjs.org/docs/events.html
   *
   * @param {SyntheticEvent} event - "change" event
   */
  onCurrencyEdited(event) {
    this.props.onCurrencyEdited({
      uuid: this.props.uuid,
      currency: event.target.value
    })
  }

  /**
   * Renders the currency widget.
   *
   * @return {ReactElement}
   */
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
  /** @type {string} */
  currency: PropTypes.string.isRequired,
  /** @type {Array} */
  currencies: PropTypes.array.isRequired,
  /** @type {function} */
  onAmountEdited: PropTypes.func.isRequired,
  /** @type {function} */
  onCurrencyEdited: PropTypes.func.isRequired
}

export default Currency
