import React from 'react';
import request from 'superagent';
// import Hello from '../components/Hello.jsx';

export default class Homepage extends React.Component {
  componentDidMount() {
    console.log("\n Homepage componentDidMount \n");
  }
  render() {
    console.log("\n\n\n Homepage Rendered \n\n\n\n\n");
    // request
    //   .get('http://localhost:8888/wp-json/wp/v2/posts')
    //   .accept('json')
    //   .end(function(err, res) {
    //     if (err) {
    //       console.log("error: ", err);
    //     }
    //     console.log("/////// res", res);
    //   });
    return (
      <div>
        123 I'm the homepage
      </div>
    );
  }
}
