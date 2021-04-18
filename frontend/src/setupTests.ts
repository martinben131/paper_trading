// We are testing with jest and enzyme
// To run tests, use 'yarn test' in the frontend folder of the repository

import "@testing-library/jest-dom";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
