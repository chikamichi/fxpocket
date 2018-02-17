import React from 'react'
import { shallow, mount } from 'enzyme'
import { assertPropTypes } from 'check-prop-types'

import Currency from './Currency'

describe('<Currency />', () => {
  const dummyProps = {
    key: 0,
    uuid: 0,
    type: 'quote',
    currency: 'EUR',
    currencies: ['EUR', 'USD'],
    amount: 42,
    onAmountEdited: () => {},
    onCurrencyEdited: () => {}
  }

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

    it('requires a "currencies" array prop', () => {
      const {currencies, ...props} = dummyProps
      expect(() => {
          assertPropTypes(Currency.propTypes, props, 'prop', Currency.currencies)
        }
      ).toThrowError(/prop `currencies` is marked as required/)
    })

    it('requires a "onAmountEdited" function prop', () => {
      const {onAmountEdited, ...props} = dummyProps
      expect(() => {
          assertPropTypes(Currency.propTypes, props, 'prop', Currency.onAmountEdited)
        }
      ).toThrowError(/prop `onAmountEdited` is marked as required/)
    })

    it('requires a "onCurrencyEdited" function prop', () => {
      const {onCurrencyEdited, ...props} = dummyProps
      expect(() => {
          assertPropTypes(Currency.propTypes, props, 'prop', Currency.onCurrencyEdited)
        }
      ).toThrowError(/prop `onCurrencyEdited` is marked as required/)
    })

    it('allows for a "type" string prop with value "quote"', () => {
      const props = {...dummyProps, type: 'quote'}
      const wrapper = shallow(<Currency {...props} />)
      expect(wrapper.instance().props.type).toEqual('quote')
    })

    it('allows for a "type" string prop with value "counter"', () => {
      const props = {...dummyProps, type: 'counter'}
      const wrapper = shallow(<Currency {...props} />)
      expect(wrapper.instance().props.type).toEqual('counter')
    })

    it('rejects invalid "type" prop values', () => {
      const props = {...dummyProps, type: 'foobar'}
      expect(() => {
          assertPropTypes(Currency.propTypes, props, 'prop', Currency.type)
        }
      ).toThrowError(/expected one of \["quote","counter"\]/)
    })
  })

  describe('layout', () => {
    var wrapper = undefined

    beforeEach(() => {
      wrapper = shallow(<Currency {...dummyProps} />)
    })

    it('renders as a div.fxp-currency', () => {
      expect(wrapper.is('div.fxp-currency')).toBe(true)
    })

    it('then renders a result area', () => {
      expect(wrapper.childAt(0).is('div.fxp-currency__result')).toBe(true)
    })

    it('first renders a currency drop-down', () => {
      expect(wrapper.childAt(1).is('select.fxp-currency__list')).toBe(true)
    })

    it('pre-selects the specified currency', () => {
      // Testing against React's "selected" API.
      // @see https://reactjs.org/docs/forms.html#the-select-tag
      expect(wrapper.find('.fxp-currency__list').is('[value="EUR"]')).toBe(true)
    })

    it('displays a text input to enter an amount, with an explicit unit', () => {
      const resultArea = wrapper.find('.fxp-currency__result')
      expect(resultArea.children().length).toEqual(2)
      // expect(resultArea.childAt(0).html().is('<input type="text" class="fxp-currency__amount"/>')).toBe(true)
      // expect(resultArea.childAt(0).equals(<input type='text' className='fxp-currency__amount' />)).toBe(true)
      // const onChange = wrapper.instance().onAmountEdited
      // console.log(onChange)
      // expect(resultArea.childAt(0).equals(<input type='text' className='fxp-currency__amount' onChange={onChange} />)).toBe(true)
      expect(resultArea.childAt(1).equals(<span className='fxp-currency__label'>€</span>)).toBe(true)
    })

    it('renders currencies as a full-fledged list', async () => {
      const wrapper = await mount(<Currency {...dummyProps} />)
      const expected = dummyProps.currencies
      const items = wrapper.update().find('.fxp-currency__list-item')
      items.forEach((option, _) => {
        expect(option.is('option')).toBe(true)
      })
      const itemsAsValues = items.map((option, _) => option.prop('value'))
      expect(itemsAsValues).toEqual(expected)
      const itemsAsKeys = items.map((option, _) => option.key())
      expect(itemsAsKeys).toEqual(expected)
      const itemsAsText = items.map((option, _) => option.text())
      itemsAsText.forEach((text, idx) => {
        const rx = new RegExp('^' + expected[idx] + ' / .+$')
        expect(text).toMatch(rx)
      })
    })
  })

  describe('events', () => {
    describe('upon editing the amount', () => {
      it('triggers props.onAmountEdited', async () => {
        const spy = jest.fn()
        const props = {...dummyProps, onAmountEdited: spy}
        const wrapper = await shallow(<Currency {...props} />)
        wrapper.update().find('.fxp-currency__amount').simulate('change', {
          target: { value: 42 }
        })
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenLastCalledWith({
          uuid: 0,
          amount: 42
        })
      })
    })

    describe('upon editing the currency', () => {
      it('triggers props.onCurrencyEdited', async () => {
        const spy = jest.fn()
        const props = {...dummyProps, onCurrencyEdited: spy}
        const wrapper = await shallow(<Currency {...props} />)
        wrapper.update().find('.fxp-currency__list').simulate('change', {
          target: { value: 'USD' }
        })
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenLastCalledWith({
          uuid: 0,
          amount: 42,
          currency: 'USD'
        }, true)
      })
    })
  })
})
