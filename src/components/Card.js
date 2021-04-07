import React from 'react';

export default function Card({ name, score, source, time }) {
  return (
    <div className="ui card">
      <div className="image">
        <img src={source} alt="profile " />
      </div>
      <div className="content">
        <h2 className="header">{name}</h2>
        <div className="meta">
          <span className="date">Joined in 2013</span>
        </div>
        <div className="description">
          {time
            ? `Best time : ${time[0][0].padStart(
                2,
                '0'
              )}: ${time[0][1].padStart(2, '0')}`
            : "Didn't won yet..."}
        </div>
      </div>
      <div className="extra content">
        <h4>score:{score}</h4>
      </div>
    </div>
  );
}
