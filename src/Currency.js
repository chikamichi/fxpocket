import React from 'react'
import PropTypes from 'prop-types'

class Currency extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  render() {
    return (
      <div className='fxp-currency'>
        <select value={this.state.currency} className='fxp-currency__list'>
          <option value='EUR'>EUR</option>
          <option value='USD'>USD</option>
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
