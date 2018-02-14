import React from 'react'
import PropTypes from 'prop-types'

class Currency extends React.Component {
  render() {
    return (
      <div className='fxp-currency'>
        <select className='fxp-currency__list'></select>
        <div className='fxp-currency__result'></div>
      </div>
    )
  }
}

Currency.propTypes = {
  type: PropTypes.oneOf(['quote', 'counter']).isRequired,
  currency: PropTypes.string.isRequired
}

export default Currency
