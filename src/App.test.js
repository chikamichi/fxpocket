import React from 'react';
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import App from './App'

describe('<App />', () => {
  const response = {
    fixer: {
      latest: {
        EUR: {
          base: 'EUR',
          date: '2018-02-15',
          rates: {
            USD: 1.25
          }
        },
        USD: {
          base: 'USD',
          date: '2018-02-15',
          rates: {
            EUR: 0.8
          }
        }
      }
    }
  }

  beforeEach(() => {
    // <App /> pre-fetches rates in widgets order.
    fetch.mockResponses([
      JSON.stringify(response.fixer.latest.EUR), {status: 200}
    ],[
      JSON.stringify(response.fixer.latest.USD), {status: 200}
    ])
  })

  describe('layout', () => {
    it('looks like the registered snapshot', () => {
      const wrapper = shallow(<App />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Currency#currenciesList()', () => {
    it('extracts the list of currencies from the state', done => {
      const wrapper = shallow(<App />)
      setImmediate(() => {
        expect(wrapper.instance().currenciesList()).toEqual(['EUR', 'USD'])
        done()
      }, 0)
    })
  })

  describe('Currency#convertAmounts()', () => {
    var wrapper

    beforeEach(() => {
      wrapper = shallow(<App />)
    })

    it('returns a null object when state.base is not set', () => {
      expect(wrapper.instance().convertAmounts()).toEqual({})
    })

    it('computes each widget\'s amount based on state.base insights', done => {
      setImmediate(() => {
        wrapper.setState({base: {amount: 2, currency: 'EUR'}})
        expect(wrapper.instance().convertAmounts()).toEqual({
          EUR: 2, // 2*1
          USD: 2.5 // 2*1.25
        })
        wrapper.setState({base: {amount: 5, currency: 'USD'}})
        expect(wrapper.instance().convertAmounts()).toEqual({
          EUR: 4, // 5*0.8
          USD: 5 // 5*1
        })
        done()
      }, 0)
    })
  })

  describe('state', () => {
    var wrapper

    beforeEach(() => {
      wrapper = shallow(<App />)
    })

    describe('.currencies', () => {
      it('is initially an empty object', () => {
        expect(wrapper).toHaveState('currencies', {})
      })

      it('is stored as a [{currency => rates}+] object', done => {
        const expected = Object.keys(response.fixer.latest).reduce((acc, currency) => {
          acc[currency] = response.fixer.latest[currency].rates
          return acc
        }, {})
        setImmediate(() => {
          expect(wrapper).toHaveState('currencies', expected)
          done()
        }, 0)
      })
    })

    describe('.base', () => {
      const initialState = {
        amount: undefined,
        currency: undefined
      }

      it('is initially empty', () => {
        expect(wrapper).toHaveState('base', initialState)
      })

      it('remains empty in the absence of a user\'s triggered update', done => {
        setImmediate(() => {
          expect(wrapper).toHaveState('base', initialState)
          done()
        }, 0)
      })

      it('is updated upon onAmountEdited()', () => {
        const newState = {
          amount: 42,
          currency: 'EUR'
        }
        wrapper.instance().onAmountEdited(newState)
        expect(wrapper).toHaveState('base', newState)
      })
    })
  })
})
