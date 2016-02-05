import React from 'react';
import PageTemplate from '../components/PageTemplate.jsx';

export default class Homepage extends React.Component {
  render() {
    return (
      <PageTemplate>
        <h1>Hello World!</h1>
        <p>I'm the Home page</p>
      </PageTemplate>
    );
  }
}
