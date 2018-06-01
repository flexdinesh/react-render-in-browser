import { Component } from 'react';
import PropTypes from 'prop-types';
import browserCheck from './browser-check';

class RenderInBrowser extends Component {
  constructor(props) {
    super(props);
    this.currentBrowser = RenderInBrowser.getCurrentBrowser();
  }

  /* istanbul ignore next */
  static getCurrentBrowser () {
    const browsers = [
      { name: 'mobile', isCurrentBrowser: browserCheck.isMobile() },
      { name: 'chrome', isCurrentBrowser: browserCheck.isChrome() },
      { name: 'firefox', isCurrentBrowser: browserCheck.isFirefox() },
      { name: 'safari', isCurrentBrowser: browserCheck.isSafari() },
      { name: 'opera', isCurrentBrowser: browserCheck.isOpera() },
      { name: 'ie', isCurrentBrowser: browserCheck.isIE() },
      { name: 'edge', isCurrentBrowser: browserCheck.isEdge() }
    ];

    const currentBrowser = browsers.filter(browser => browser.isCurrentBrowser === true);
    if (currentBrowser.length && currentBrowser.length === 1) return currentBrowser[0].name;
    else undefined;
  }

  shouldRenderForBrowser() {
    const { only, except, all, none } = this.props;
    
    if (all) return true;
    else if (none) return false;
    
    const browsersInProps = [];
    /* eslint-disable no-undef */
    for(let prop in this.props) {
      if (this.props.hasOwnProperty(prop) && this.props[prop] === true)
        browsersInProps.push(prop);
    }
    /* eslint-enable no-undef */

    if (only) return browsersInProps.includes(this.currentBrowser);
    else if (except) return !browsersInProps.includes(this.currentBrowser);
    else return browsersInProps.includes(this.currentBrowser);
  }

  render() {
    const { children } = this.props;
    const shouldRender = this.shouldRenderForBrowser();
    
    if (shouldRender) {
      return children;
    } else {
      return null;
    }
  }
}

RenderInBrowser.propTypes = {
  chrome: PropTypes.bool,
  firefox: PropTypes.bool,
  safari: PropTypes.bool,
  opera: PropTypes.bool,
  ie: PropTypes.bool,
  edge: PropTypes.bool,
  blink: PropTypes.bool,
  mobile: PropTypes.bool,
  except: PropTypes.bool,
  only: PropTypes.bool,
  all: PropTypes.bool,
  none: PropTypes.bool,
  children: PropTypes.node
};

RenderInBrowser.defaultProps = {
  chrome: false,
  firefox: false,
  safari: false,
  opera: false,
  ie: false,
  edge: false,
  mobile: false,
  blink: false,
  except: false,
  only: false,
  all: false,
  none: false
};

export default RenderInBrowser;