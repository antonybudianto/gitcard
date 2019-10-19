import React, { Component } from 'react';

import CardSection from './CardSection';

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
    const devs = this.state.data.map(d => {
      d.node = d.dev.node;
      d.node.avatarUrl = d.avatarUrl;
      return d;
    });
    return (
      <div
        style={{
          display: this.props.display ? 'block' : 'none'
        }}
      >
        <>
          <CardSection
            selected={this.state.selectedCity}
            full={this.state.selectedCity !== ''}
            showLocation={false}
            header={`Top popular dev`}
            subheader={'>= 100 followers, updated biweekly'}
            items={devs}
            onClick={this.props.onClick}
            profilesCount={devs.length}
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
