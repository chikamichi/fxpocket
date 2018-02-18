import React from 'react'
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

    describe('.baseAmount', () => {
      const initialState = undefined

      it('is initially empty', () => {
        expect(wrapper).toHaveState('baseAmount', initialState)
      })

      it('is updated upon onAmountEdited() being triggered by the base currency widget', () => {
        const payload = {
          uuid: 0,
          amount: 42
        }
        wrapper.instance().onAmountEdited(payload)
        expect(wrapper).toHaveState('baseAmount', payload.amount)
      })

      it('is updated upon onAmountEdited() being triggered by a quote currency widget', () => {
        const payload = {
          uuid: 1,
          amount: 42
        }
        wrapper.instance().onAmountEdited(payload)
        // Tests' default state is:
        // - widgets is ['EUR', 'USD']
        // - 1 EUR = 0.8 USD
        const expected = 42 * 0.8
        expect(wrapper).toHaveState('baseAmount', expected)
      })
    })
  })
})
