import { React } from 'react';
import PropTypes from 'prop-types';
import './App.css';

function Recommendation({ recommendations, onPressCreate }) {
  const rows = [];
  // console.log(recommendations);

  Object.keys(recommendations).map((keyName) => { // eslint-disable-line array-callback-return
    // use keyName to get current key's name

    rows.push(
      <tr className="active-user">
        {' '}
        <td>{keyName}</td>
        {' '}
        <td>{recommendations[keyName]}</td>
        {' '}

        {' '}
        <td>
          <button type="button" onClick={() => onPressCreate(keyName)}>
            {' '}
            Create Event
            {' '}
            {' '}
            <i className="fas fa-plus" />
          </button>
          {' '}
        </td>

        {' '}
      </tr>,

    );
  });
  return (
    <div className="recommendations">
      <div> </div>
      <h2 className="five">Top 5 Reccomendations </h2>
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
        <i id="arrow" className="fas fa-long-arrow-alt-down" />
      </div>
    </div>
  );
}
Recommendation.propTypes = {
  recommendations: PropTypes.objectOf(PropTypes.string).isRequired,
  onPressCreate: PropTypes.func.isRequired,
};

export default Recommendation;
