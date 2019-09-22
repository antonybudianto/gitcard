import React from 'react';

function CardSection({ header, subheader = '', items }) {
  return (
    <section className="Card-section">
      <div className="Card-header">
        <h3>{header}</h3>
        <div className="Card-subheader">{subheader}</div>
      </div>
      <div className="Card-container">
        {items.map((u, i) => {
          return (
            <div className="Card" key={i}>
              <img
                src={u.node.avatarUrl}
                alt={u.node.login}
                className="Card-img"
              />
              <div className="flex-wrap flex-col">
                <span>
                  <a href={`https://github.com/${u.node.login}`}>
                    {u.node.login}
                  </a>
                </span>
                <div>{u.node.followers.totalCount} followers</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CardSection;
