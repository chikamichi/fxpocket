import React from 'react'
import { shallow } from 'enzyme'

import App from './App'
import * as Utils from './utils'
import Fixer from './fixer'

describe('Utilities', () => {
  describe('convertAmounts()', () => {
    var fixer

    beforeAll(async () => {
      await Fixer.connect().then(f => {
        fixer = f
      })
    })

    it('supports currying over a Fixer instance', () => {
      const curried = Utils.convertAmounts(fixer)
      expect(curried()).toEqual({})
    })

    it('returns a null object when the base is not set', () => {
      expect(Utils.convertAmounts(fixer, undefined)).toEqual({})
      expect(Utils.convertAmounts(fixer)()).toEqual({})
    })

    it('computes each widget\'s amount based on state.base insights', () => {
      let base = {amount: 2, currency: 'EUR'}
      expect(Utils.convertAmounts(fixer, base)).toEqual({
        EUR: 2, // 2*1
        USD: 2.5 // 2*1.25
      })
      base = {amount: 5, currency: 'USD'}
      expect(Utils.convertAmounts(fixer, base)).toEqual({
        EUR: 4, // 5*0.8
        USD: 5 // 5*1
      })
    })

    it('truncates floats to a precision of 2 decimals', () => {
      // Same precision fixer.io exposes its rates and people usually expect
      // amounts to be expressed as.
      const base = {amount: 1.239, currency: 'EUR'}
      expect(Utils.convertAmounts(fixer, base)).toEqual({
        EUR: 1.24, // 1.239*1 truncated
        USD: 1.55 // 1.239*1.25 = 1.54875 truncated
      })
    })
  })
})
