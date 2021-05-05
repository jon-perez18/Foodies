import { React } from 'react';
import PropTypes from 'prop-types';
import './MyMap.css';

function Stars(props) {
  const {
    ratings,
  } = props;

  Stars.propTypes = {
    ratings: PropTypes.number.isRequired,
  };
  const stars = [];
  const star = <i className="fas fa-star star" />;
  const halfStar = <i className="fas fa-star-half-alt star" />;
  const emptyStar = <i className="far fa-star star" />;

  function getStars(rate) {
    const decimal = rate % 1;
    const nonDecimal = Math.floor(rate);
    let empty = 5;
    let j = 0;
    for (j; j < nonDecimal; j += 1) {
      stars.push(star);
      empty -= 1;
    }
    if (decimal !== 0) {
      stars.push(halfStar);
      empty -= 1;
    }
    let k = 0;
    for (k; k < empty; k += 1) {
      stars.push(emptyStar);
    }
  }
  getStars(ratings);

  return (

    <div>
      {stars}

    </div>

  );
}
export default Stars;
