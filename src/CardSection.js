import React from 'react';

function CardSection({
  header,
  subheader = '',
  items,
  showLocation = true,
  onClick = () => {}
}) {
  return (
    <section className="Card-section">
      <div className="Card-header">
        <h3>{header}</h3>
        <div className="Card-subheader">{subheader}</div>
      </div>
      <div className="Card-container">
        {items.map((u, i) => {
          return (
            <div
              className="Card"
              key={i}
              onClick={e => {
                onClick(u);
              }}
            >
              <img
                src={u.node.avatarUrl}
                alt={u.node.login}
                className="Card-img"
              />
              <div className="Card-right flex-wrap flex-col">
                <div className="Card-name">{u.node.name}</div>
                <div className="text-center">
                  <a
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
    </section>
  );
}

export default CardSection;
