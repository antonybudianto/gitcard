import React, { Component } from 'react';
import CardSection from './CardSection';

class LangView extends Component {
  render() {
    let topAllDevs = [];
    let topJsDevs = [];
    let topPythonDevs = [];
    let topJavaDevs = [];
    let topGoDevs = [];
    const { data } = this.props;
    if (data !== null) {
      topAllDevs = data.topAllDev.edges;
      topJavaDevs = data.topJavaDev.edges;
      topPythonDevs = data.topPythonDev.edges;
      topJsDevs = data.topJsDev.edges;
      topGoDevs = data.topGoDev.edges;
    }
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
            items={topAllDevs}
          />
          <CardSection
            header="Top popular JavaScript dev"
            subheader=">= 200 followers"
            items={topJsDevs}
          />
          <CardSection
            header="Top popular Java dev"
            subheader=">= 200 followers"
            items={topJavaDevs}
          />
          <CardSection
            header="Top popular Python dev"
            subheader=">= 150 followers"
            items={topPythonDevs}
          />
          <CardSection
            header="Top popular Go dev"
            subheader=">= 100 followers"
            items={topGoDevs}
          />
        </div>
      </div>
    );
  }
}

export default LangView;
