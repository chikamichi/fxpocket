import React, { Component } from 'react'

import { APP_TITLE, APP_MOTTO } from './utils'

/**
 * **StaticUI — A presentational wrapper to prettify the core app.**
 *
 * @type {function}
 * @param {React.Component} WrappedComponent - Expected to be {@link App}
 * @return {React.Component}
 */
export default (WrappedComponent) => {
  return class StaticUI extends Component {
    render() {
      return (
        <div className="fxp">
          <header>
            <h1 className="fxp-title">{APP_TITLE}</h1>
            <h2 className="fxp-motto">{APP_MOTTO}</h2>
          </header>
          <WrappedComponent {...this.props} />
          <footer>
            <ul className='fxp-u-list  fxp-footer-links'>
              <li className='fxp-u-list__item'>
                <a
                  className='fxp-footer-link'
                  href='https://github.com/chikamichi/fxpocket/'
                >source</a>
              </li>
              <li className='fxp-u-list__item'>
                <a
                  className='fxp-footer-link'
                  href='https://en.wikipedia.org/wiki/Exchange_rate'
                >about exchange rates</a>
              </li>
            </ul>
          </footer>
        </div>
      )
    }
  }
}
