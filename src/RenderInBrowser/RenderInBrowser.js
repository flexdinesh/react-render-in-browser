import PropTypes from 'prop-types';
import browserCheck from './browser-check';

const getBrowsersArr = () => {
  const browsers = [
    { name: 'mobile', isCurrentBrowser: browserCheck.isMobile() },
    { name: 'chrome', isCurrentBrowser: browserCheck.isChrome() },
    { name: 'firefox', isCurrentBrowser: browserCheck.isFirefox() },
    { name: 'safari', isCurrentBrowser: browserCheck.isSafari() },
    { name: 'opera', isCurrentBrowser: browserCheck.isOpera() },
    { name: 'ie', isCurrentBrowser: browserCheck.isIE() },
    { name: 'edge', isCurrentBrowser: browserCheck.isEdge() },
    { name: 'blink', isCurrentBrowser: browserCheck.isBlink() }
  ];
  return browsers;
};

const shouldRenderForBrowser = (props, browsers) => {
  const allBrowsers = browserCheck.allBrowsers;

  let restrictedBrowsers = [];
  let allowedBrowsers = [];

  const only = props.only === true || typeof props.only === 'undefined';
  const except = props.except === true;

  if (except) {
    allBrowsers.forEach((browser) => {
      if (props[browser]) restrictedBrowsers.push(browser);
      else allowedBrowsers.push(browser);
    });
  } else if (only) {
    allBrowsers.forEach((browser) => {
      if (props[browser]) allowedBrowsers.push(browser);
      else restrictedBrowsers.push(browser);
    });
  } else {
    // never goes here
    allowedBrowsers = allBrowsers.slice();
  }

  const currentBrowser = browsers.find(
    (browser) => browser.isCurrentBrowser === true
  );
  if (currentBrowser && restrictedBrowsers.includes(currentBrowser.name))
    return false;
  else if (currentBrowser && allowedBrowsers.includes(currentBrowser.name))
    return true;
  else return false;
};

const RenderInBrowser = (props) => {
  const { children } = props;
  const browsers = getBrowsersArr();
  const shouldRender = shouldRenderForBrowser(props, browsers);

  if (shouldRender) {
    return children;
  } else {
    return null;
  }
};

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
  blink: false
};

export default RenderInBrowser;