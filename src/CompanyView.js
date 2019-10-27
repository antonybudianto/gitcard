import React, { Component } from 'react';

import CardSection from './CardSection';

const transformDevData = data => {
  return data.map(d => {
    d.node = d.dev.node;
    d.node.avatarUrl = d.avatarUrl;
    return d;
  });
};

const firstUpper = str => str[0].toUpperCase() + str.substring(1);

class CompanyView extends Component {
  state = {
    loading: true,
    data: []
  };

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

  render() {
    return (
      <div
        style={{
          display: this.props.display ? 'block' : 'none'
        }}
      >
        <>
          {this.state.data.map((d, i) => (
            <CardSection
              key={i}
              full={this.state.selectedCity !== ''}
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
