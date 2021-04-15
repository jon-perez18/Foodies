import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
export function Recommendation({
  recommendations
}) {
  const rows = [];
  
  Object.keys(recommendations).map((keyName) => {
    // use keyName to get current key's name
    
      rows.push(
        <tr className="active-user">
          {' '}
          
          <td>{keyName}</td>
          {' '}
          <td>{recommendations[keyName]}</td>
          <td><button> Create Event </button> </td>
          {' '}
        </tr>,
      );
  
    // and a[keyName] to get its value
  });
  return (
    <div className="leaderboard">
      <div>
        {' '}
        
      </div>
        <h2>Top 5 Reccomendations </h2>
        <div>
          <table>
            <thead>
              <tr>
                <th>Restaurant</th>
                <th>Address</th>
                
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      
        
    </div>
  );
}
Recommendation.propTypes = {
  recommendations: PropTypes.objectOf(PropTypes.string).isRequired
  
};
