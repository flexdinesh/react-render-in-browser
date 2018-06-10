
import PropTypes from 'prop-types';
import { isSSR } from './utils';
import { shouldRenderForBrowser } from './handler';


const RenderInBrowser = (props) => {
  const { children } = props;
  const shouldRender = !isSSR() && shouldRenderForBrowser(props);
  if (typeof children === 'function') {
    const shouldRenderFunc = (args) => {
      return !isSSR() && shouldRenderForBrowser(args);
    }
    return children(shouldRenderFunc);
  }
  if (shouldRender) {
    return children;
  } else {
    return null;
  }
}


RenderInBrowser.propTypes = {
  chrome: PropTypes.bool,
  firefox: PropTypes.bool,
  safari: PropTypes.bool,
  opera: PropTypes.bool,
  ie: PropTypes.bool,
  edge: PropTypes.bool,
  mobile: PropTypes.bool,
  except: PropTypes.bool,
  only: PropTypes.bool,
  all: PropTypes.bool,
  none: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
};

RenderInBrowser.defaultProps = {
  chrome: false,
  firefox: false,
  safari: false,
  opera: false,
  ie: false,
  edge: false,
  mobile: false,
  except: false,
  only: false,
  all: false,
  none: false
};

export default RenderInBrowser;