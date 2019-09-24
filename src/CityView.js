import React, { Component } from 'react';

import CardSection from './CardSection';
import './CityView.css';

const CITIES = [
  {
    field: 'topJakartaDev',
    name: 'Jakarta',
    subheader: '>=300 followers',
    list: []
  },
  {
    field: 'topBandungDev',
    name: 'Bandung',
    subheader: '>=200 followers',
    list: []
  },
  {
    field: 'topYogyakartaDev',
    name: 'Yogyakarta',
    subheader: '>=100 followers',
    list: []
  },
  {
    field: 'topMalangDev',
    name: 'Malang',
    subheader: '>=100 followers',
    list: []
  },
  {
    field: 'topSurabayaDev',
    name: 'Surabaya',
    subheader: '>=100 followers',
    list: []
  }
];

class CityView extends Component {
  state = {
    selectedCity: ''
  };

  handleSelectCity = city => {
    this.setState({
      selectedCity: city
    });
  };

  render() {
    let cities = CITIES;
    const { data } = this.props;
    if (data !== null) {
      cities = CITIES.map(c => {
        if (data[c.field]) {
          c.list = data[c.field].edges;
        }
        return c;
      });
    }

    let newCities = cities.filter(c => {
      if (this.state.selectedCity === '') {
        return true;
      }
      return this.state.selectedCity === c.name;
    });

    return (
      <div
        style={{
          display: this.props.display ? 'block' : 'none'
        }}
      >
        <div className="App-content flex-wrap">
          <div
            onClick={() => this.handleSelectCity('')}
            className={
              'Item-tag ' + (this.state.selectedCity === '' ? 'active' : '')
            }
          >
            All cities
          </div>
          {cities.map((c, i) => (
            <div
              key={i}
              onClick={() => this.handleSelectCity(c.name)}
              className={
                'Item-tag ' +
                (this.state.selectedCity === c.name ? 'active' : '')
              }
            >
              {c.name}
            </div>
          ))}
        </div>

        <div className="App-content flex-wrap">
          {newCities.map((c, i) => (
            <CardSection
              key={i}
              full={this.state.selectedCity !== ''}
              showLocation={false}
              header={`Top popular ${c.name} dev`}
              subheader={c.subheader}
              items={c.list}
              onClick={this.props.onClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default CityView;
