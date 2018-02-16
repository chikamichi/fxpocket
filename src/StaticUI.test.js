import React from 'react'
import { shallow } from 'enzyme'

import App from './App';
import StaticUI from './StaticUI'

const PrettyApp = StaticUI(App)

describe('Wrapping, static UI', () => {
  describe('layout', () => {
    var wrapper

    beforeEach(async () => {
      const PrettyApp = StaticUI(App)
      wrapper = await shallow(<PrettyApp />)
      wrapper.update()
    })

    it('looks like the registered snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

})
