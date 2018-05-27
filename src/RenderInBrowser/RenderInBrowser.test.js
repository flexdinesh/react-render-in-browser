import React from 'react';
import { shallow } from 'enzyme';
import RenderInBrowser from 'index';

describe('RenderInBrowser', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<RenderInBrowser />);
    expect(wrapper).toHaveLength(1);
  });
});
