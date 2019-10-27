import React, { Component, createRef } from 'react';

import CardSection from './CardSection';
import { firstUpper, transformDevData } from './utils';

class CompanyView extends Component {
  state = {
    loading: true,
    data: [],
    selectedItem: ''
  };

  filterRef = createRef();

  componentDidMount() {
    fetch('/api/gh/topcompanies')
      .then(res => {
        if (!res.ok) {
          throw new Error('Error fetch topcompanies');
        }
        return res.json();
      })
      .then(res => {
        let data = res.data || {};
        data = Object.keys(data).reduce((a, c) => {
          a[c] = transformDevData(data[c]);
          return a;
        }, {});
        data = Object.entries(data).sort((a, b) => b[1].length - a[1].length);

        this.setState({
          data
        });
      })
      .catch(() => {
        this.setState({
          data: []
        });
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  }

  handleSelectItem = (item, e) => {
    this.filterRef.current.scrollTo({
      left: e.target.offsetLeft - 20,
      behavior: 'smooth'
    });
    this.setState({
      selectedItem: item
    });
  };

  render() {
    const newCompanies = this.state.data.filter(
      d => this.state.selectedItem === '' || d[0] === this.state.selectedItem
    );
    return (
      <div
        style={{
          display: this.props.display ? 'block' : 'none'
        }}
      >
        <div className="flex-wrap Filter-container" ref={this.filterRef}>
          <div
            onClick={e => this.handleSelectItem('', e)}
            className={
              'Item-tag ' + (this.state.selectedItem === '' ? 'active' : '')
            }
          >
            All cities
          </div>
          {this.state.data.map((d, i) => (
            <div
              key={i}
              onClick={e => this.handleSelectItem(d[0], e)}
              className={
                'Item-tag ' + (this.state.selectedItem === d[0] ? 'active' : '')
              }
            >
              {firstUpper(d[0])}
            </div>
          ))}
        </div>
        <>
          {newCompanies.map((d, i) => (
            <CardSection
              key={i}
              full={this.state.selectedItem !== ''}
              showLocation={false}
              header={`Top popular ${firstUpper(d[0])} dev`}
              subheader={'>= 100 followers, updated biweekly'}
              items={d[1] || []}
              onClick={this.props.onClick}
            />
          ))}
        </>
        {!this.state.loading &&
          !this.state.data.length &&
          'Data is being prepared, please refresh the page after a while.'}
        {this.state.loading && 'This will take some time, please wait!...'}
      </div>
    );
  }
}

export default CompanyView;
