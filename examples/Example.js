import React from 'react';
import RenderInBrowser, {withBrowser} from '../src/index';

const HocALll = withBrowser(()=><div>This line will render in all browsers</div>, {
  all: true
});
const HocChromeFirfoxOnly = withBrowser(()=><div>This line will render in chrome firefox only</div>, {
  chrome: true,
  firefox: true,
  only:true
});
const Example = () => {
  return (
    <div>
      <h1> children Component </h1>
      <RenderInBrowser all>
        <div>This line will render in all browsers</div>
      </RenderInBrowser>
      <RenderInBrowser none>
        <div>This line will not render in any browsers</div>
      </RenderInBrowser>
      <RenderInBrowser chrome firefox only>
        <div>This line will render in chrome firefox only</div>
      </RenderInBrowser>
      <RenderInBrowser chrome firefox>
        <div>This line will render in chrome firefox</div>
      </RenderInBrowser>
      <RenderInBrowser chrome only>
        <div>This line will render in chrome only</div>
      </RenderInBrowser>
      <RenderInBrowser safari only>
        <div>This line will render in safari only</div>
      </RenderInBrowser>
      <RenderInBrowser mobile only>
        <div>This line will render in mobile only</div>
      </RenderInBrowser>
      <RenderInBrowser except mobile>
        <div>This line will render in all browsers except mobile</div>
      </RenderInBrowser>
      <RenderInBrowser except chrome firefox>
        <div>This line will render in all browsers except chrome firefox</div>
      </RenderInBrowser>
      <h1>render props component </h1>
      <RenderInBrowser>
        {(shouldRenderForBrowser) => {
          return (<div>
            {shouldRenderForBrowser({ all: true }) && <div>This line will render in all browsers renderProps</div>}
            {shouldRenderForBrowser({ none: true }) && <div>This line will not render in any browsers</div>}
            {shouldRenderForBrowser({ chrome: true, except: true }) && <div>this line will render in all browsers except chrome firefox</div>}
          </div> ) }
        }
      </RenderInBrowser>
      <h1>Hoc</h1>
      <HocALll />
      <HocChromeFirfoxOnly />
    </div>
  );
};

export default Example;