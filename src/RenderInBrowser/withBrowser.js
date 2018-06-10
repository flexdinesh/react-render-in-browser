import React from 'react';
import { isSSR } from './utils';
import { shouldRenderForBrowser } from './handler';

function withBrowser(Component, config) {
  const Wrapper = (props) => {
    const shouldRender = !isSSR() && shouldRenderForBrowser(config);
    return (
      shouldRender ? <Component {...props} /> : null
    )
  }
  Wrapper.displayName = `withBrowser(${Component.displayName || Component.name})`
  return Wrapper
}

export default withBrowser;