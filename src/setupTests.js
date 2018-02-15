// https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'
import fetchMock from 'jest-fetch-mock'

configure({ adapter: new Adapter() })
global.fetch = fetchMock

export const responses = {
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

// <App /> pre-fetches currencies' rates, in widgets order.
export const mockInitialApiCalls = () => {
  fetch.mockResponses([
    JSON.stringify(responses.fixer.latest.EUR), {status: 200}
  ],[
    JSON.stringify(responses.fixer.latest.USD), {status: 200}
  ])
}
