import React, { Component, createRef } from 'react';

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
    field: 'topBaliDev',
    name: 'Bali',
    subheader: '>=100 followers',
    list: []
  },
  {
    field: 'topSurabayaDev',
    name: 'Surabaya',
    subheader: '>=100 followers',
    list: []
  },
  {
    field: 'topSemarangDev',
    name: 'Semarang',
    subheader: '>=100 followers',
    list: []
  }
];

class CityView extends Component {
  state = {
    selectedCity: ''
  };

  filterRef = createRef();

  handleSelectCity = (city, e) => {
    this.filterRef.current.scrollTo({
      left: e.target.offsetLeft - 20,
      behavior: 'smooth'
    });
    this.setState({
      selectedCity: city
    });
  };

  render() {
    let cities = CITIES;
    const { data } = this.props;
    if (data) {
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
        <div className="flex-wrap Filter-container" ref={this.filterRef}>
          <div
            onClick={e => this.handleSelectCity('', e)}
            className={
              'Item-tag ' + (this.state.selectedCity === '' ? 'active' : '')
            }
          >
            All cities
          </div>
          {cities.map((c, i) => (
            <div
              key={i}
              onClick={e => this.handleSelectCity(c.name, e)}
              className={
                'Item-tag ' +
                (this.state.selectedCity === c.name ? 'active' : '')
              }
            >
              {c.name}
            </div>
          ))}
        </div>

        <>
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
        </>
      </div>
    );
  }
}

export default CityView;
