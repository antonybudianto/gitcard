import React, { Component } from 'react';
import CardSection from './CardSection';

class LangView extends Component {
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

  render() {
    return (
      <div
        style={{
          display: this.props.display ? 'block' : 'none'
        }}
      >
        <div className="App-content flex-wrap">
          <CardSection
            header="Top popular overall"
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

export default LangView;
