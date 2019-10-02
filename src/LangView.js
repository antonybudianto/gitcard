import React, { Component } from 'react';

import CardSection from './CardSection';

const LANGS = [
  {
    field: 'topJsDev',
    name: 'JavaScript',
    subheader: '>=200 followers',
    list: []
  },
  {
    field: 'topPHPDev',
    name: 'PHP',
    subheader: '>=200 followers',
    list: []
  },
  {
    field: 'topJavaDev',
    name: 'Java',
    subheader: '>=200 followers',
    list: []
  },
  {
    field: 'topPythonDev',
    name: 'Python',
    subheader: '>=150 followers',
    list: []
  },
  {
    field: 'topHTMLDev',
    name: 'HTML',
    subheader: '>=150 followers',
    list: []
  },
  {
    field: 'topGoDev',
    name: 'Go',
    subheader: '>=100 followers',
    list: []
  },
  {
    field: 'topRubyDev',
    name: 'Ruby',
    subheader: '>=100 followers',
    list: []
  },
  {
    field: 'topShellDev',
    name: 'Shell',
    subheader: '>=100 followers',
    list: []
  },
  {
    field: 'topSwiftDev',
    name: 'Swift',
    subheader: '>=50 followers',
    list: []
  }
];

class LangView extends Component {
  state = {
    selectedLang: ''
  };

  handleSelectLang = lang => {
    this.setState({
      selectedLang: lang
    });
  };
  render() {
    let langs = LANGS;
    const { data } = this.props;

    if (data !== null) {
      langs = LANGS.map(c => {
        if (data[c.field]) {
          c.list = data[c.field].edges;
        }
        return c;
      });
    }

    let newLangs = langs.filter(c => {
      if (this.state.selectedLang === '') {
        return true;
      }
      return this.state.selectedLang === c.name;
    });

    return (
      <div
        style={{
          display: this.props.display ? 'block' : 'none',
          overflow: 'hidden'
        }}
      >
        <div className="App-content flex-wrap">
          <div
            onClick={() => this.handleSelectLang('')}
            className={
              'Item-tag ' + (this.state.selectedLang === '' ? 'active' : '')
            }
          >
            All languages
          </div>
          {langs.map((c, i) => (
            <div
              key={i}
              onClick={() => this.handleSelectLang(c.name)}
              className={
                'Item-tag ' +
                (this.state.selectedLang === c.name ? 'active' : '')
              }
            >
              {c.name}
            </div>
          ))}
        </div>
        <>
          {newLangs.map((c, i) => (
            <CardSection
              key={i}
              selected={this.state.selectedLang}
              full={this.state.selectedLang !== ''}
              showLocation={false}
              header={`Top popular ${c.name} dev`}
              subheader={c.subheader}
              items={c.list}
              onClick={this.props.onClick}
              profilesCount={c.list.length}
            />
          ))}
        </>
      </div>
    );
  }
}

export default LangView;
