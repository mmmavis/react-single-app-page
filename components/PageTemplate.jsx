import React from 'react';
import request from 'superagent';

export default class PageTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wpLoaded: false
    };
  }
  render() {
    return (
      <div>
        <div>{this.props.children}</div>
        <div id="emoji">＼＼\\٩( 'ω' )و //／／</div>
      </div>
    );
  }
}
