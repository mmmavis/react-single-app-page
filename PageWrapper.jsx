import React from 'react';

export default React.createClass({
  render() {
    return (
      <html>
        <head lang="en">
          <meta charSet="UTF-8" />
          <title>Simple React app with Webpack</title>
          <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css' />
          <link href="../public/style.css" type="text/css" rel="stylesheet" />
        </head>
        <body>
          <div id="app">
            {this.props.children}
          </div>
          <script src="../bundle.js"></script>
        </body>
      </html>
    );
  }
});
