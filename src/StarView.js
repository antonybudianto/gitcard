import React, { Component } from 'react';

import CardSection from './CardSection';
import { transformDevData } from './utils';

class StarView extends Component {
  state = {
    loading: true,
    data: []
  };

  componentDidMount() {
    fetch('/api/gh/topstars')
      .then(res => {
        if (!res.ok) {
          throw new Error('Error fetch topstars');
        }
        return res.json();
      })
      .then(res => {
        this.setState({
          data: res.data || []
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
    const devs = transformDevData(this.state.data);
    return (
      <div
        style={{
          display: this.props.display ? 'block' : 'none'
        }}
      >
        <>
          <CardSection
            full={this.state.selectedCity !== ''}
            showLocation={false}
            header={`Top popular dev`}
            subheader={'>= 100 followers, updated biweekly'}
            items={devs}
            onClick={this.props.onClick}
          />
        </>
        {!this.state.loading &&
          !this.state.data.length &&
          'Data is being prepared, please refresh the page after a while.'}
        {this.state.loading && 'This will take some time, please wait!...'}
      </div>
    );
  }
}

export default StarView;
