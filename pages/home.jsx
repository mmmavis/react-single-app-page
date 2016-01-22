import React from 'react';
import request from 'superagent';
import Hello from '../components/Hello.jsx';

export default class Homepage extends React.Component {
  componentDidMount() {
    console.log("\n\n\nsuppp\n\n\n\n\n");
  }
  render() {
    console.log("\n\n\n hiiii \n\n\n\n\n");
    request
      .get('http://localhost:8888/wp-json/wp/v2/posts')
      .accept('json')
      .end(function(err, res) {
        if (err) {
          console.log("error: ", err);
        }
        console.log("/////// res", res);
      });
    return (
      <div>
        <Hello/>
        123
      </div>
    );
  }
}
