import React from 'react';
import RenderInBrowser from '../src/index';

const Example = () => {
  return (
    <div>
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
    </div>
  );
};

export default Example;