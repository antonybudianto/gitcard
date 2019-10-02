import React from 'react';

import './CardSection.css';

class CardSection extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      cardsInARow: 0
    };
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    const width = window.innerWidth;
    let cardsInARow;
    switch (true) {
      case width > 992:
        cardsInARow = 5;
        break;
      case width > 768 && width < 992:
        cardsInARow = 4;
        break;
      case width > 468 && width < 768:
        cardsInARow = 2;
        break;
      default:
        cardsInARow = 1;
    }
    this.setState({ cardsInARow });
  };

  incrementSelectedIndex = () => {
    this.setState(({ selectedIndex }) => ({
      selectedIndex: selectedIndex + 1
    }));
  };
  decrementSelectedIndex = () => {
    this.setState(({ selectedIndex }) => ({
      selectedIndex: selectedIndex - 1
    }));
  };
  render() {
    const {
      header,
      subheader = '',
      items,
      full,
      showLocation = true,
      onClick = () => {},
      profilesCount
    } = this.props;

    const { selectedIndex, cardsInARow } = this.state;
    const style =
      selectedIndex >= 1
        ? { transform: `translateX(-${selectedIndex * 100}%)` }
        : {};

    let slidesCount;
    if (cardsInARow) {
      slidesCount = Math.ceil(profilesCount / cardsInARow);
    }
    const renderNavigation =
      slidesCount >= 1 ? (
        <div>
          <button
            className={`Navigation-icon ${
              selectedIndex === 0 ? 'disabled' : ''
            }`}
            onClick={this.decrementSelectedIndex}
            disabled={selectedIndex === 0 ? true : false}
          >
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </button>
          <button
            className={`Navigation-icon ${
              selectedIndex === slidesCount - 1 ? 'disabled' : ''
            }`}
            onClick={this.incrementSelectedIndex}
          >
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      ) : null;
    return (
      <section className={'Card-section ' + (full ? 'full' : '')}>
        <div className="Card-header">
          <div className="Heading-wrapper">
            <h3>{header}</h3>
            <div className="Card-subheader">{subheader}</div>
          </div>
          {renderNavigation}
        </div>
        <div className="Card-carousel">
          <div className="Card-container" style={style}>
            {items.map((u, i) => {
              return (
                <div
                  className="Card"
                  key={i}
                  onClick={e => {
                    onClick(u);
                  }}
                >
                  <div className="Card-img-wrapper">
                    <div className="Card-circle"></div>
                    <div className="Card-number">{i + 1}</div>
                    <img
                      src={u.node.avatarUrl}
                      alt={u.node.login}
                      className="Card-img"
                    />
                  </div>
                  <div className="Card-right flex-wrap flex-col">
                    <div className="Card-name">{u.node.name}</div>
                    <div className="text-center">
                      <a
                        className="Card__link"
                        onClick={e => {
                          e.stopPropagation();
                        }}
                        href={`https://github.com/${u.node.login}`}
                      >
                        {u.node.login}
                      </a>
                    </div>
                    {showLocation && (
                      <div
                        style={{
                          fontSize: '10pt'
                        }}
                        className="text-center mt1 text-gray"
                      >
                        {u.node.location}
                      </div>
                    )}
                    <div className="flex Card-stat space-around">
                      <div className="flex flex-col align-center Card-stat-item">
                        {' '}
                        <strong>{u.node.followers.totalCount}</strong>followers
                      </div>
                      <div className="flex flex-col align-center Card-stat-item">
                        {' '}
                        <strong>{u.node.following.totalCount}</strong>following
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default CardSection;
