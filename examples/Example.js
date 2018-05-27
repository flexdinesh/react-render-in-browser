import React from 'react';

import RenderInBrowser from '../src/index';

class Example extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <RenderInBrowser>
          <div>Hello World!</div>
        </RenderInBrowser>
      </div>
    );
  }
}

export default Example;
