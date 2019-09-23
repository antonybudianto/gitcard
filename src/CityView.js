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
            showLocation={false}
            header="Top popular Jakarta dev"
            subheader=">= 300 followers"
            items={topJakartaDev}
            onClick={this.props.onClick}
          />
          <CardSection
            showLocation={false}
            header="Top popular Bandung dev"
            subheader=">= 200 followers"
            items={topBandungDev}
            onClick={this.props.onClick}
          />
          <CardSection
            showLocation={false}
            header="Top popular Yogyakarta dev"
            subheader=">= 100 followers"
            items={topJogjaDev}
            onClick={this.props.onClick}
          />
          <CardSection
            showLocation={false}
            header="Top popular Malang dev"
            subheader=">= 100 followers"
            items={topMalangDev}
            onClick={this.props.onClick}
          />
        </div>
      </div>
    );
  }
}

export default CityView;
