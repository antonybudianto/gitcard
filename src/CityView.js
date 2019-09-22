import React, { Component } from 'react';
import CardSection from './CardSection';

class CityView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topJakartaDev: [],
      topBandungDev: [],
      topJogjaDev: [],
      topMalangDev: []
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
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchGh('location=Jakarta&follower=>=300&language=*', 'topJakartaDev');
    this.fetchGh('location=Bandung&follower=>=200&language=*', 'topBandungDev');
    this.fetchGh(
      'location=Yogyakarta&follower=>=100&language=*',
      'topJogjaDev'
    );
    this.fetchGh('location=Malang&follower=>=100&language=*', 'topMalangDev');
  }

  render() {
    return (
      <div
        style={{
          display: this.props.display ? 'block' : 'none'
        }}
      >
        <div className="App-content flex-wrap">
          <CardSection
            header="Top popular Jakarta dev"
            subheader=">= 300 followers"
            items={this.state.topJakartaDev}
          />
          <CardSection
            header="Top popular Bandung dev"
            subheader=">= 200 followers"
            items={this.state.topBandungDev}
          />
          <CardSection
            header="Top popular Yogyakarta dev"
            subheader=">= 100 followers"
            items={this.state.topJogjaDev}
          />
          <CardSection
            header="Top popular Malang dev"
            subheader=">= 100 followers"
            items={this.state.topMalangDev}
          />
        </div>
      </div>
    );
  }
}

export default CityView;
