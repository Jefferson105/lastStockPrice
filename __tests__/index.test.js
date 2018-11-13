import { shallow } from 'enzyme';
import React from 'react';

import App from '../pages/index.js';

describe('With Enzyme', () => {
  it('App shows "Market Action"', () => {
    const app = shallow(<App />)

    expect(app.find("h1").text()).toEqual("Market Action");
  })
})