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
              <img src={u.avatar_url} alt={u.login} className="Card-img" />
              <span>
                <a href={`https://github.com/${u.login}`}>{u.login}</a>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CardSection;
