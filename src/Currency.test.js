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
      type: '',
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
      console.log(props)
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
})
