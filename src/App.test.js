import React from 'react';
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import App from './App'

describe('<App />', () => {
  describe('layout', () => {
    var wrapper

    beforeEach(async () => {
      wrapper = await shallow(<App />)
      wrapper.update()
    })

    it('looks like the registered snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Currency#convertAmounts()', () => {
    var wrapper

    beforeEach(async () => {
      wrapper = await shallow(<App />)
      wrapper.update()
    })

    it('returns a null object when state.base is not set', () => {
      expect(wrapper.instance().convertAmounts()).toEqual({})
    })

    it('computes each widget\'s amount based on state.base insights', () => {
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
    })

    it('truncates float to a precision of 2 decimals', () => {
      // Same precision fixer.io exposes its rates and people usually expect
      // amounts to be expressed as.
      wrapper.setState({base: {amount: 1.239, currency: 'EUR'}})
      expect(wrapper.instance().convertAmounts()).toEqual({
        EUR: 1.24, // 1.239*1 truncated
        USD: 1.55 // 1.239*1.25 = 1.54875 truncated
      })
    })
  })

  describe('state', () => {
    var wrapper

    beforeEach(async () => {
      wrapper = await shallow(<App />)
      wrapper.update()
    })

    // describe('.currencies', () => {
    //   it('is stored as a [{currency => rates}+] object', () => {
    //     const expected = Object.keys(responses.fixer.latest).reduce((acc, currency) => {
    //       acc[currency] = responses.fixer.latest[currency].rates
    //       return acc
    //     }, {})
    //     expect(wrapper).toHaveState('currencies', expected)
    //   })
    // })

    describe('.widgets', () => {
      const initialState = ['EUR', 'USD']

      it('initially instructs to display two widgets, EUR and USD', () => {
        expect(wrapper).toHaveState('widgets', initialState)
      })

      it('is updated upon onCurrencyEdited()', () => {
        const payload = {
          uuid: 0,
          amount: 42,
          currency: 'USD'
        }
        const newState = ['USD', 'USD']
        wrapper.instance().onCurrencyEdited(payload)
        expect(wrapper).toHaveState('widgets', newState)
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

      it('is updated upon onAmountEdited()', () => {
        const newState = {
          amount: 42,
          currency: 'EUR'
        }
        wrapper.instance().onAmountEdited(newState)
        expect(wrapper).toHaveState('base', newState)
      })

      it('is updated upon onCurrencyEdited()', () => {
        const payload = {
          uuid: 0,
          amount: 42,
          currency: 'USD'
        }
        const newState = {
          amount: 42,
          currency: 'USD'
        }
        wrapper.instance().onCurrencyEdited(payload)
        expect(wrapper).toHaveState('base', newState)
      })
    })
  })
})
