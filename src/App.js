import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import logo from './logo.svg';
import './App.css';
import PostList from './Components/PostList';
import Post from './Components/Post';
import About from './Components/About';

import settingsJson from './settings.json';

class App extends Component {

  render() {
    const basename = settingsJson.basename;

    return (
      <Router basename={basename}>
        <Fragment>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-2"
               style={{ paddingTop: '.25rem', paddingBottom: '.25rem' }}>
            <Link to="/" className="navbar-brand">
              <img className="navbar-brand-logo" style={{ width: '32px' }} alt="Logo" src={logo}/> G+ Post Archive
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav mr-auto">
                {/*<li className="nav-item">*/}
                {/*<Link className="nav-link" href="/posts"><i className="far fa-file"/> Posts</Link>*/}
                {/*</li>*/}
              </ul>

              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="https://github.com/evilgeniuslabs/gplus-archive" className="nav-link"><i
                    className="fab fa-github"/> Fork me on GitHub</a>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link"><i className="fas fa-info-circle"/> About</Link>
                </li>
              </ul>
            </div>
          </nav>

          <main role="main" className="container-fluid">
            <Switch>
              <Route exact path={"/about"} component={About}/>
              <Route exact path={"/"} component={PostList}/>
              <Route path={"/posts/:id"} component={Post}/>
            </Switch>

          </main>

        </Fragment>
      </Router>
    );
  }
}

export default App;
