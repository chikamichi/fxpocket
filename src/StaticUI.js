import React, { Component } from 'react'

import { APP_TITLE, APP_MOTTO } from './utils'

/*
 * StaticUI — A presentational wrapper to prettify the core app.
 */
export default (WrappedComponent) => {
  return class StaticUI extends Component {
    render() {
      return (
        <div className="fxp">
          <h1 className="fxp-title">{APP_TITLE}</h1>
          <h2 className="fxp-motto">{APP_MOTTO}</h2>
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
}
