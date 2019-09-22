import React, { Component } from 'react';

import './App.css';
import SearchView from './SearchView';
import CityView from './CityView';
import LangView from './LangView';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'city',
      data: null
    };
  }

  componentDidMount() {
    fetch('/api/gh/summary')
      .then(res => {
        if (!res.ok) {
          throw new Error('Error fetch summary');
        }
        return res.json();
      })
      .then(res => {
        this.setState({
          data: res.data
        });
      });
  }

  handleChangeCity = () => {
    this.setState({
      view: 'city'
    });
  };

  handleChangeLang = () => {
    this.setState({
      view: 'lang'
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>GitCard</h1>
          <p className="App-p">
            Discover awesome Open-source dev from <strong>Indonesia</strong>
          </p>
        </header>
        <SearchView />
        <div className="App-content flex-wrap">
          <div
            className={'Tab ' + (this.state.view === 'lang' ? 'active' : '')}
            onClick={this.handleChangeLang}
          >
            by Language
          </div>
          <div
            className={'Tab ' + (this.state.view === 'city' ? 'active' : '')}
            onClick={this.handleChangeCity}
          >
            by City
          </div>
        </div>
        <LangView data={this.state.data} display={this.state.view === 'lang'} />
        <CityView data={this.state.data} display={this.state.view === 'city'} />
        <footer className="App-content App-footer">
          <div>
            *GitHub API has rate limit, so if you get empty result, please
            revisit after a minute.
          </div>
          <div>
            *You can contribute at{' '}
            <a
              rel="noopener noreferrer"
              href="https://github.com/antonybudianto/gitcard"
            >
              github.com/antonybudianto/gitcard
            </a>
          </div>
          <div>&copy; {new Date().getFullYear()}. Antony Budianto.</div>
        </footer>
      </div>
    );
  }
}

export default App;
