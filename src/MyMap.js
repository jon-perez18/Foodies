import './MyMap.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import { React } from 'react';
import PropTypes from 'prop-types';

function MyMap(props) {
  const {
    onPressCreate,
    recommendations,
    ratings,
    phone,
    long,
    lat,
  } = props;
  const restaurant = [];
  const location = [];
  console.log('long', long);
  console.log(ratings);
  Object.keys(recommendations).map((keyName) => {
    restaurant.push(keyName);
    location.push(recommendations[keyName]);
    return restaurant;
  });
  console.log(restaurant);
  console.log(location);
  MyMap.propTypes = {
    onPressCreate: PropTypes.func.isRequired,
    recommendations: PropTypes.objectOf(PropTypes.string).isRequired,
    ratings: PropTypes.arrayOf(PropTypes.string).isRequired,
    phone: PropTypes.arrayOf(PropTypes.string).isRequired,
    long: PropTypes.arrayOf(PropTypes.number).isRequired,
    lat: PropTypes.arrayOf(PropTypes.number).isRequired,
  };
  return (
    <div>
      <MapContainer center={[lat[0], long[0]]} zoom={13} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat[0], long[0]]}>
          <Popup>
            <p>
              Name:
              {restaurant[0]}
            </p>
            {' '}
            <p>
              Location:
              {location[0]}
            </p>
            <p>
              Ratings:
              {ratings[0]}
            </p>
            {' '}
            <p>
              Phone:
              {phone[0] }
            </p>
            <button type="button" onClick={() => onPressCreate(restaurant[0])}> Create Event </button>
          </Popup>
        </Marker>
        <Marker position={[lat[1], long[1]]}>
          <Popup>
            <p>
              Name:
              {restaurant[1]}
            </p>
            {' '}
            <p>
              Location:
              {location[1]}
            </p>
            <p>
              Ratings:
              {ratings[1]}
            </p>
            {' '}
            <p>
              Phone:
              {phone[1] }
            </p>
            <button type="button" onClick={() => onPressCreate(restaurant[1])}> Create Event </button>
          </Popup>
        </Marker>
        <Marker position={[lat[2], long[2]]}>
          <Popup>
            <p>
              Name:
              {restaurant[2]}
            </p>
            {' '}
            <p>
              Location:
              {location[2]}
            </p>
            <p>
              Ratings:
              {ratings[2]}
            </p>
            {' '}
            <p>
              Phone:
              {phone[2] }
            </p>
            <button type="button" onClick={() => onPressCreate(restaurant[2])}> Create Event </button>
          </Popup>
        </Marker>
        <Marker position={[lat[3], long[3]]}>
          <Popup>
            <p>
              Name:
              {restaurant[3]}
            </p>
            {' '}
            <p>
              Location:
              {location[3]}
            </p>
            <p>
              Ratings:
              {ratings[3]}
            </p>
            {' '}
            <p>
              Phone:
              {phone[3] }
            </p>
            <button type="button" onClick={() => onPressCreate(restaurant[3])}> Create Event </button>
          </Popup>
        </Marker>
        <Marker position={[lat[4], long[4]]}>
          <Popup>
            <p>
              Name:
              {restaurant[4]}
            </p>
            {' '}
            <p>
              Location:
              {location[4]}
            </p>
            <p>
              Ratings:
              {ratings[4]}
            </p>
            {' '}
            <p>
              Phone:
              {phone[4] }
            </p>
            <button type="button" onClick={() => onPressCreate(restaurant[4])}> Create Event </button>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
export default MyMap;
