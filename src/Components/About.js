import React, { Component, Fragment } from 'react';

class About extends Component {
  render() {
    return (
      <Fragment>
        <h3>About</h3>
        <p>
          <a href="https://github.com/evilgeniuslabs/gplus-archive">G+ Archiver</a> is a project for generating a completely client-side archive of exported G+ posts.
          The archive can be hosted publicly for free on <a href="https://pages.github.com">GitHub Pages</a> using the
          instructions at <a href="https://github.com/gitname/react-gh-pages">react-gh-pages</a>
        </p>
        <p>
          This project was bootstrapped with <a href="https://github.com/facebook/create-react-app">Create React App</a>.
        </p>
      </Fragment>
    );
  }
}

export default About;
