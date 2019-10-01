import React from 'react';

import './CardSection.css';

class CardSection extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
  }
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

    const { selectedIndex } = this.state;
    const style =
      selectedIndex >= 1
        ? { transform: `translateX(-${selectedIndex * 100}%)` }
        : {};
    console.log('Selectedindex', selectedIndex);
    const slidesCount = profilesCount / 5;
    console.log('slidesCount', slidesCount);
    const renderNavigation =
      slidesCount > 1 ? (
        <div>
          <button
            className="Navigation-icon"
            onClick={this.decrementSelectedIndex}
          >
            &#8249;
          </button>
          <button
            className="Navigation-icon"
            onClick={this.incrementSelectedIndex}
          >
            &#8250;
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
                  <div className="Image-wrapper">
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
                        onClick={e => {
                          e.stopPropagation();
                        }}
                        className="Profile-link"
                        href={`https://github.com/${u.node.login}`}
                      >
                        @{u.node.login}
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
