import React, { Component } from 'react';
import CardSection from './CardSection';

class CityView extends Component {
  render() {
    let topJakartaDev = [];
    let topBandungDev = [];
    let topJogjaDev = [];
    let topMalangDev = [];
    const { data } = this.props;
    if (data !== null) {
      topJakartaDev = data.topJakartaDev.edges;
      topBandungDev = data.topBandungDev.edges;
      topJogjaDev = data.topYogyakartaDev.edges;
      topMalangDev = data.topMalangDev.edges;
    }

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
            items={topJakartaDev}
          />
          <CardSection
            header="Top popular Bandung dev"
            subheader=">= 200 followers"
            items={topBandungDev}
          />
          <CardSection
            header="Top popular Yogyakarta dev"
            subheader=">= 100 followers"
            items={topJogjaDev}
          />
          <CardSection
            header="Top popular Malang dev"
            subheader=">= 100 followers"
            items={topMalangDev}
          />
        </div>
      </div>
    );
  }
}

export default CityView;
