import React from 'react'
import { shallow } from 'enzyme'
import { assertPropTypes } from 'check-prop-types'

import Currency from './Currency'

describe('<Currency />', () => {
  it('renders a currency element', () => {
    const wrapper = shallow(<Currency />)
    expect(wrapper).toBePresent()
  })

  describe('props', () => {
    // A Tale of Three Pitfalls:
    //
    // https://github.com/airbnb/enzyme/pull/1243
    // Testing props requires components to be stateful, starting with React 16.
    //
    // https://github.com/airbnb/enzyme/issues/588
    // When using PropTypes.oneOf(), one is limited to whitelist testing; that
    // is, testing all valid values, which leaves room for error due to new
    // valid values being added to the code but not in the test. Test must be
    // maintained as well!
    //
    // https://github.com/facebook/prop-types/issues/28
    // When a required prop-type is not provided, React console.log() which is
    // hard to test against. Using the check-prop-types library will work around
    // that issue, until React provides a native way to toggle error throwing in
    // tests.

    const dummyProps = {
      type: 'quote',
      currency: ''
    }

    it('requires a "type" string prop', () => {
      const {type, ...props} = dummyProps
      expect(() => {
          assertPropTypes(Currency.propTypes, props, 'prop', Currency.type)
        }
      ).toThrowError(/prop `type` is marked as required/)
    })

    it('requires a "currency" string prop', () => {
      const {currency, ...props} = dummyProps
      expect(() => {
          assertPropTypes(Currency.propTypes, props, 'prop', Currency.currency)
        }
      ).toThrowError(/prop `currency` is marked as required/)
    })

    it('allows for a "type" string prop with value "quote"', () => {
      const wrapper = shallow(<Currency type='quote' />)
      expect(wrapper.instance().props.type).toEqual('quote')
    })

    it('allows for a "type" string prop with value "counter"', () => {
      const wrapper = shallow(<Currency type='counter' />)
      expect(wrapper.instance().props.type).toEqual('counter')
    })

    it('rejects invalid "type" prop values', () => {
      const props = dummyProps
      props.type = 'foobar'
      expect(() => {
          assertPropTypes(Currency.propTypes, props, 'prop', Currency.type)
        }
      ).toThrowError(/expected one of \["quote","counter"\]/)
    })

    it('allows for a "currency" string prop', () => {
      const wrapper = shallow(<Currency currency='EUR' />)
      expect(wrapper.instance().props.currency).toEqual('EUR')
    })
  })

  describe('layout', () => {
    var wrapper = undefined

    beforeEach(() => {
      wrapper = shallow(<Currency type='quote' currency='EUR' />)
    })

    it('renders as a div.fxp-currency', () => {
      expect(wrapper.is('div.fxp-currency')).toBe(true)
    })

    it('renders as a div.fxp-currency--{type}', () => {
      expect(wrapper.is('div.fxp-currency--quote')).toBe(true)
    })

    it('first renders a currency drop-down', () => {
      expect(wrapper.childAt(0).is('select.fxp-currency__list')).toBe(true)
    })

    it('then renders a result area', () => {
      expect(wrapper.childAt(1).is('div.fxp-currency__result')).toBe(true)
    })

    it('pre-selects the specified currency', () => {
      // Testing against React's "selected" API.
      // @see https://reactjs.org/docs/forms.html#the-select-tag
      expect(wrapper.find('.fxp-currency__list').is('[value="EUR"]')).toBe(true)
    })

    it('displays a text input to enter an amount, with an explicit unit', () => {
      const resultArea = wrapper.find('.fxp-currency__result')
      expect(resultArea.children().length).toEqual(2)
      expect(resultArea.childAt(0).equals(<input type='text' className='fxp-currency__amount' />)).toBe(true)
      expect(resultArea.childAt(1).equals(<span className='fxp-currency__label'>EUR</span>)).toBe(true)
    })
  })
})
