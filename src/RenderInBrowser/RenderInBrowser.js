import PropTypes from 'prop-types';
import browserCheck from './browser-check';

const getAllDefinedBrowsers = () => {
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
  const { only, except, all, none } = props;
  const allBrowsers = browserCheck.allBrowsers;

  let restrictedBrowsers = [];
  let allowedBrowsers = [];

  const currentBrowser = browsers.find(
    (browser) => browser.isCurrentBrowser === true
  );

  if (all) {
    return true;
  } else if (none) {
    return false;
  } else if (except) {
    allBrowsers.forEach((browser) => {
      if (props[browser]) restrictedBrowsers.push(browser);
      else allowedBrowsers.push(browser);
    });
  } else if (only) {
    allBrowsers.forEach((browser) => {
      if (props[browser]) allowedBrowsers.push(browser);
      else restrictedBrowsers.push(browser);
    });
  } else if (!all && !only && !except && !none) {
    allBrowsers.forEach((browser) => {
      if (props[browser]) allowedBrowsers.push(browser);
      else restrictedBrowsers.push(browser);
    });
  }
  
  if (currentBrowser && restrictedBrowsers.includes(currentBrowser.name))
    return false;
  else if (currentBrowser && allowedBrowsers.includes(currentBrowser.name))
    return true;
  
  return false;
};

const RenderInBrowser = (props) => {
  const { children } = props;
  const browsers = getAllDefinedBrowsers();
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