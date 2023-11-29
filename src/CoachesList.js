// CoachesList.js
import React from 'react';

const CoachesList = ({ nflData }) => {
  const afcDivisions = ['AFC East', 'AFC North', 'AFC South', 'AFC West'];
  const nfcDivisions = ['NFC East', 'NFC North', 'NFC South', 'NFC West'];

  const renderDivision = (division, color) => (
    <div key={division} className={`${color} m-2 p-4 rounded-lg shadow-lg`}>
      <h2 className="font-bold underline text-lg mb-2">{division}</h2>
      <ul>
        {Object.entries(nflData[division]).map(([team, coach]) => (
          <li key={team} className="p-1">
            {team}: {coach}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="p-4">
      <div className="grid md:grid-cols-4 gap-4 mb-4">
        {afcDivisions.map(division => renderDivision(division, 'bg-red-400'))}
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        {nfcDivisions.map(division => renderDivision(division, 'bg-blue-400'))}
      </div>
    </div>
  );
};

export default CoachesList;
