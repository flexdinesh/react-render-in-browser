import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import RenderInBrowser from './RenderInBrowser';

describe('RenderInBrowser', () => {
  let currentBrowserStub;

  beforeEach(() => {
    currentBrowserStub = sinon.stub(RenderInBrowser, 'getCurrentBrowser').returns('chrome');
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<RenderInBrowser />);
    expect(wrapper).toHaveLength(1);
  });

  it('does not render children when no prop is passed', () => {
    const wrapper = shallow(
      <RenderInBrowser>
        <span>Hello World!</span>
      </RenderInBrowser>
    );
    expect(wrapper.children()).toHaveLength(0);
  });

  it('does not render children when none is passed', () => {
    const wrapper = shallow(
      <RenderInBrowser none>
        <span>Hello World!</span>
      </RenderInBrowser>
    );
    expect(wrapper.children()).toHaveLength(0);
  });

  it('should render children when browser is passed without only/except', () => {
    const wrapper = shallow(
      <RenderInBrowser chrome firefox>
        <span>Hello World!</span>
      </RenderInBrowser>
    );
    expect(wrapper.html()).toEqual('<span>Hello World!</span>');
  });

  it('should render children when all is passed', () => {
    const wrapper = shallow(
      <RenderInBrowser all>
        <span>Hello World!</span>
      </RenderInBrowser>
    );
    expect(wrapper.html()).toEqual('<span>Hello World!</span>');
  });

  it('should render children when multiple browsers are passed with only - random check', () => {
    currentBrowserStub.returns('firefox');

    const wrapper = shallow(
      <RenderInBrowser chrome firefox ie only>
        <span>Hello World!</span>
      </RenderInBrowser>
    );
    expect(wrapper.html()).toEqual('<span>Hello World!</span>');
  });

  it('should render children when multiple browsers are passed with except - random check', () => {
    currentBrowserStub.returns('safari');
    const wrapper = shallow(
      <RenderInBrowser chrome firefox ie except>
        <span>Hello World!</span>
      </RenderInBrowser>
    );
    expect(wrapper.html()).toEqual('<span>Hello World!</span>');
  });

  it('should not render children when multiple browsers are passed with only - random check', () => {
    currentBrowserStub.returns('safari');
    const wrapper = shallow(
      <RenderInBrowser chrome firefox ie only>
        <span>Hello World!</span>
      </RenderInBrowser>
    );
    expect(wrapper.children()).toHaveLength(0);
  });

  it('should not render children when multiple browsers are passed with except - random check', () => {
    currentBrowserStub.returns('ie');
    const wrapper = shallow(
      <RenderInBrowser chrome firefox ie except>
        <span>Hello World!</span>
      </RenderInBrowser>
    );
    expect(wrapper.children()).toHaveLength(0);
  });

  afterEach(() => {
    currentBrowserStub.restore();
  });
});
