// https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'

configure({ adapter: new Adapter() })
