import React from 'react'
import { shallow } from 'enzyme'

import Currency from './Currency'

describe('<Currency />', () => {
  it('renders a currency element', () => {
    const wrapper = shallow(<Currency />)
    expect(wrapper).toBePresent()
  })

  describe('props', () => {
    // A Tale of Two Pitfalls:
    //
    // https://github.com/airbnb/enzyme/pull/1243
    // Testing props requires components to be stateful, starting with React 16.
    //
    // https://github.com/airbnb/enzyme/issues/588
    // When using PropTypes.oneOf(), one is limited to whitelist testing; that
    // is, testing all valid values, which leaves room for error due to new
    // valid values being added to the code but not in the test. Test must be
    // maintained as well!

    it('allows for a "type" string prop with value "quote"', () => {
      const wrapper = shallow(<Currency type='quote' />)
      expect(wrapper.instance().props.type).toEqual('quote')
    })

    it('allows for a "type" string prop with value "counter"', () => {
      const wrapper = shallow(<Currency type='counter' />)
      expect(wrapper.instance().props.type).toEqual('counter')
    })

    it('allows for a "currency" string prop', () => {
      const wrapper = shallow(<Currency currency='EUR' />)
      expect(wrapper.instance().props.currency).toEqual('EUR')
    })
  })
})
