import React from 'react';

export default React.createClass({
  render() {
    return (
      <html>
        <head lang="en">
          <meta charSet="UTF-8" />
          <title>Simple React app with Webpack</title>
          <link href="../public/style.css" type="text/css" rel="stylesheet" />
        </head>
        <body>
          <div id="app" className="container">
            {this.props.children}
          </div>
          <script src="../bundle.js"></script>
        </body>
      </html>
    )
  }
});
