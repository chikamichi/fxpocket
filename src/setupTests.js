// https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'
import Fixer from './fixer'

// Implicit mocking doesn't seem to apply to user-modules. Let's mock explicitly.
// @see https://facebook.github.io/jest/docs/en/manual-mocks.html
jest.mock('./fixer')

configure({ adapter: new Adapter() })
