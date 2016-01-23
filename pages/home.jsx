import React from 'react';
import request from 'superagent';
import Hello from '../components/Hello';

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wpLoaded: false
    };
  }
  componentDidMount() {
    console.log("Homepage componentDidMount");
    var self = this;
    request
      .get('http://localhost:8888/wp-json/wp/v2/posts')
      .accept('json')
      .end(function(err, res) {
        if (err) { console.log("error: ", err); }
        var wpPosts = JSON.parse(res.text);
        console.log("/////// ", wpPosts);
        self.wpPost1 = wpPosts[0].content.rendered;
        self.setState({wpLoaded: true});
      });
  }
  render() {
    console.log("Homepage Rendered");
    return (
      <div>
        <Hello />
        <p>I'm the homepage!!!</p>
        <h2>Wordpress Post #1 content as below</h2>
        <div id="wp-post">
          {this.state.wpLoaded ? <div dangerouslySetInnerHTML={{__html: this.wpPost1}} /> 
                               : "loading WP posts..."}
        </div>
      </div>
    );
  }
}
