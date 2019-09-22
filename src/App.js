import React, { Component } from 'react';
import './App.css';
import SearchView from './SearchView';

function CardSection({ header, subheader = '', items }) {
  return (
    <section className="Card-section">
      <div className="Card-header">
        <h3>{header}</h3>
        <div className="Card-subheader">{subheader}</div>
      </div>
      <div className="Card-container">
        {items.map((u, i) => {
          return (
            <div className="Card" key={i}>
              <img src={u.avatar_url} alt={u.login} className="Card-img" />
              <span>
                <a href={`https://github.com/${u.login}`}>{u.login}</a>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topAllDevs: [],
      topJsDevs: [],
      topGoDevs: [],
      topJavaDevs: [],
      topPythonDevs: [],
      topPhpDevs: []
    };
  }

  fetchGh = (query, field) => {
    return fetch('/api/gh/top-users/?' + query)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error fetch');
        }
        return res.json();
      })
      .then(r => {
        this.setState({
          [field]: r.data.items || []
        });
      });
  };

  componentDidMount() {
    this.fetchGh('location=Indonesia&follower=>=500&language=*', 'topAllDevs');
    this.fetchGh(
      'location=Indonesia&follower=>=200&language=JavaScript',
      'topJsDevs'
    );
    this.fetchGh(
      'location=Indonesia&follower=>=200&language=Java',
      'topJavaDevs'
    );
    this.fetchGh(
      'location=Indonesia&follower=>=150&language=Python',
      'topPythonDevs'
    );
    this.fetchGh('location=Indonesia&follower=>=100&language=Go', 'topGoDevs');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>GitCard</h1>
          <p className="App-p">Discover Open-source dev from Indonesia</p>
        </header>
        <SearchView />
        <div className="App-content flex-wrap">
          <CardSection
            header="Top popular dev"
            subheader=">= 500 followers"
            items={this.state.topAllDevs}
          />
          <CardSection
            header="Top popular JavaScript dev"
            subheader=">= 200 followers"
            items={this.state.topJsDevs}
          />
          <CardSection
            header="Top popular Java dev"
            subheader=">= 200 followers"
            items={this.state.topJavaDevs}
          />
          <CardSection
            header="Top popular Python dev"
            subheader=">= 150 followers"
            items={this.state.topPythonDevs}
          />
          <CardSection
            header="Top popular Go dev"
            subheader=">= 100 followers"
            items={this.state.topGoDevs}
          />
        </div>
      </div>
    );
  }
}

export default App;
