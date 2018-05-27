import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import RenderInBrowser from './RenderInBrowser';
import browserCheck from './browser-check';

describe('RenderInBrowser', () => {
  beforeEach(() => {
    window.HTMLElement = undefined;
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
    const isChrome = sinon.stub(browserCheck, 'isChrome').returns(true);
    
    const wrapper = shallow(
      <RenderInBrowser chrome firefox>
        <span>Hello World!</span>
      </RenderInBrowser>
    );
    // expect(wrapper.children()).toHaveLength(0);
    expect(wrapper.html()).toEqual('<span>Hello World!</span>');
    isChrome.restore();
  });

  it('should render children when all is passed', () => {
    const wrapper = shallow(
      <RenderInBrowser all>
        <span>Hello World!</span>
      </RenderInBrowser>
    );
    expect(wrapper.html()).toEqual('<span>Hello World!</span>');
  });

  it('should render children only in one browser', () => {
    const browsers = ['chrome', 'firefox', 'opera', 'safari', 'ie', 'edge', 'blink', 'mobile'];

    browsers.forEach((currentBrowser) => {
      let stub;
      if (currentBrowser === 'chrome') stub = sinon.stub(browserCheck, 'isChrome').returns(true);
      else if (currentBrowser === 'firefox') stub = sinon.stub(browserCheck, 'isFirefox').returns(true);
      else if (currentBrowser === 'opera') stub = sinon.stub(browserCheck, 'isOpera').returns(true);
      else if (currentBrowser === 'safari') stub = sinon.stub(browserCheck, 'isSafari').returns(true);
      else if (currentBrowser === 'ie') stub = sinon.stub(browserCheck, 'isIE').returns(true);
      else if (currentBrowser === 'edge') stub = sinon.stub(browserCheck, 'isEdge').returns(true);
      else if (currentBrowser === 'blink') stub = sinon.stub(browserCheck, 'isBlink').returns(true);
      else if (currentBrowser === 'mobile') stub = sinon.stub(browserCheck, 'isMobile').returns(true);

      const wrapper = shallow(
        <RenderInBrowser {...{ [currentBrowser]: true }} only>
          <span>Hello World!</span>
        </RenderInBrowser>
      );
      expect(wrapper.html()).toEqual('<span>Hello World!</span>');

      browsers.filter(br => br !== currentBrowser).forEach((otherBrowser) => {
        const browserProp = { [otherBrowser]: currentBrowser === otherBrowser };
        const wrapper = shallow(
          <RenderInBrowser {...browserProp} only>
            <span>Hello World!</span>
          </RenderInBrowser>
        );
        expect(wrapper.children()).toHaveLength(0);
      });
      
      stub.restore();
    });
  });

  it('should render children in all browsers except one', () => {
    const browsers = ['chrome', 'firefox', 'opera', 'safari', 'ie', 'edge', 'blink', 'mobile'];

    browsers.forEach((currentBrowser) => {
      let stub;
      if (currentBrowser === 'chrome') stub = sinon.stub(browserCheck, 'isChrome').returns(true);
      else if (currentBrowser === 'firefox') stub = sinon.stub(browserCheck, 'isFirefox').returns(true);
      else if (currentBrowser === 'opera') stub = sinon.stub(browserCheck, 'isOpera').returns(true);
      else if (currentBrowser === 'safari') stub = sinon.stub(browserCheck, 'isSafari').returns(true);
      else if (currentBrowser === 'ie') stub = sinon.stub(browserCheck, 'isIE').returns(true);
      else if (currentBrowser === 'edge') stub = sinon.stub(browserCheck, 'isEdge').returns(true);
      else if (currentBrowser === 'blink') stub = sinon.stub(browserCheck, 'isBlink').returns(true);
      else if (currentBrowser === 'mobile') stub = sinon.stub(browserCheck, 'isMobile').returns(true);

      const wrapper = shallow(
        <RenderInBrowser except {...{ [currentBrowser]: true }}>
          <span>Hello World!</span>
        </RenderInBrowser>
      );
      expect(wrapper.children()).toHaveLength(0);

      browsers.filter(br => br !== currentBrowser).forEach((otherBrowser) => {
        const browserProp = { [otherBrowser]: currentBrowser === otherBrowser };
        const wrapper = shallow(
          <RenderInBrowser except {...browserProp}>
            <span>Hello World!</span>
          </RenderInBrowser>
        );
        expect(wrapper.html()).toEqual('<span>Hello World!</span>');
      });
      
      stub.restore();
    });
  });

  it('should render children when multiple browsers are passed with only - random check', () => {
    const isFirefox = sinon.stub(browserCheck, 'isFirefox').returns(true);
    const wrapper = shallow(
      <RenderInBrowser chrome firefox ie only>
        <span>Hello World!</span>
      </RenderInBrowser>
    );
    expect(wrapper.html()).toEqual('<span>Hello World!</span>');

    isFirefox.restore();
  });

  it('should not render children when multiple browsers are passed with only - random check', () => {
    const isSafari = sinon.stub(browserCheck, 'isSafari').returns(true);
    const wrapper = shallow(
      <RenderInBrowser chrome firefox ie only>
        <span>Hello World!</span>
      </RenderInBrowser>
    );
    expect(wrapper.children()).toHaveLength(0);

    isSafari.restore();
  });

  it('should not render children when multiple browsers are passed with except - random check', () => {
    const isIE = sinon.stub(browserCheck, 'isIE').returns(true);
    const wrapper = shallow(
      <RenderInBrowser chrome firefox ie except>
        <span>Hello World!</span>
      </RenderInBrowser>
    );
    expect(wrapper.children()).toHaveLength(0);

    isIE.restore();
  });

  it('should render children when multiple browsers are passed with except - random check', () => {
    const isSafari = sinon.stub(browserCheck, 'isSafari').returns(true);
    const wrapper = shallow(
      <RenderInBrowser chrome firefox ie except>
        <span>Hello World!</span>
      </RenderInBrowser>
    );
    expect(wrapper.html()).toEqual('<span>Hello World!</span>');

    isSafari.restore();
  });
});
