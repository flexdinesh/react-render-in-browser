import { arrayIncludes } from './utils';
import browserCheck from './browser-check';
const getCurrentBrowser = () => {
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

export const shouldRenderForBrowser = (props) => {
  const { only, except, all, none } = props;
  if (all) return true;
  else if (none) return false;
  const browsersInProps = [];
  /* eslint-disable no-undef */
  for(let prop in props) {
    if (props.hasOwnProperty(prop) && props[prop] === true)
      browsersInProps.push(prop);
  }
  /* eslint-enable no-undef */
  const currentBrowserCheck = arrayIncludes(browsersInProps, getCurrentBrowser());
  if (only) return   currentBrowserCheck;
  else if (except) return !currentBrowserCheck;
  else return currentBrowserCheck;
}
