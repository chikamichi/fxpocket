import React from 'react'
import PropTypes from 'prop-types'

class Currency extends React.Component {
  render() {
    return (
      <div></div>
    )
  }
}

Currency.propTypes = {
  type: PropTypes.oneOf(['quote', 'counter']).isRequired,
  currency: PropTypes.string.isRequired
}

export default Currency
