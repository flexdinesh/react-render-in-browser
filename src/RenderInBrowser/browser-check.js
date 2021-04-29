/* istanbul ignore file */

const getUa = () => (window.navigator || {}).userAgent;

// Mobile Browsers
export const isMobile = () => {
  const ua = getUa()
  if (ua) {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua))
  }
  return false;
}

// Opera 8.0+
export const isOpera = () => {
  let opr = window.opr || {};
  return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
}

// Firefox 1.0+
export const isFirefox = () => typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
export const isSafari = () => {
  let safari = window.safari || {};
  return /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
}

// Internet Explorer 6-11
export const isIE = () => /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
export const isEdge = () => {
  const isEdgeHtml = !isIE() && !!window.StyleMedia;
  if (isEdgeHtml) {
    return true
  }

  const ua = getUa()
  if (ua) {
    return (/Edg/i.test(ua))
  }

  return false
}

// Chrome 1+
export const isChrome = () => !!window.chrome && !isOpera();

export const allBrowsers = ['chrome', 'firefox', 'safari', 'opera', 'ie', 'edge', 'mobile'];

export default {
  isOpera,
  isFirefox,
  isSafari,
  isIE,
  isEdge,
  isChrome,
  isMobile,
  allBrowsers
}
