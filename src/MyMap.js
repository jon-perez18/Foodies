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
    results2,
  } = props;

  MyMap.propTypes = {
    onPressCreate: PropTypes.func.isRequired,
    ratings: PropTypes.arrayOf(PropTypes.string).isRequired,
    phone: PropTypes.arrayOf(PropTypes.string).isRequired,
    results2: PropTypes.objectOf(PropTypes.object).isRequired,
  };
  return (
    <div>
      <MapContainer center={[results2[0].lat, results2[0].longi]} zoom={13} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[results2[0].lat, results2[0].longi]}>
          <Popup>
            <p>
              Name:
              {results2[0].restaurant }
            </p>
            {' '}
            <p>
              Location:
              {results2[0].location }
            </p>
            <p>
              Ratings:
              {results2[0].ratings }
            </p>
            {' '}
            <p>
              Phone:
              {results2[0].phone }
            </p>
            <button type="button" onClick={() => onPressCreate(results2[0].restaurant)}> Create Event </button>
          </Popup>
        </Marker>
        <Marker position={[results2[1].lat, results2[1].longi]}>
          <Popup>
            <p>
              Name:
              {results2[1].restaurant }
            </p>
            {' '}
            <p>
              Location:
              {results2[1].location }
            </p>
            <p>
              Ratings:
              {results2[1].ratings }
            </p>
            {' '}
            <p>
              Phone:
              {results2[1].phone }
            </p>
            <button type="button" onClick={() => onPressCreate(results2[1].restaurant)}> Create Event </button>
          </Popup>
        </Marker>
        <Marker position={[results2[2].lat, results2[2].longi]}>
          <Popup>
            <p>
              Name:
              {results2[2].restaurant }
            </p>
            {' '}
            <p>
              Location:
              {results2[2].location }
            </p>
            <p>
              Ratings:
              {results2[2].ratings }
            </p>
            {' '}
            <p>
              Phone:
              {results2[2].phone }
            </p>
            <button type="button" onClick={() => onPressCreate(results2[2].restaurant)}> Create Event </button>
          </Popup>
        </Marker>
        <Marker position={[results2[3].lat, results2[3].longi]}>
          <Popup>
            <p>
              Name:
              {results2[3].restaurant }
            </p>
            {' '}
            <p>
              Location:
              {results2[3].location }
            </p>
            <p>
              Ratings:
              {results2[3].ratings }
            </p>
            {' '}
            <p>
              Phone:
              {results2[3].phone }
            </p>
            <button type="button" onClick={() => onPressCreate(results2[3].restaurant)}> Create Event </button>
          </Popup>
        </Marker>
        <Marker position={[results2[4].lat, results2[4].longi]}>
          <Popup>
            <p>
              Name:
              {results2[4].restaurant }
            </p>
            {' '}
            <p>
              Location:
              {results2[4].location }
            </p>
            <p>
              Ratings:
              {results2[4].ratings }
            </p>
            {' '}
            <p>
              Phone:
              {results2[4].phone }
            </p>
            <button type="button" onClick={() => onPressCreate(results2[4].restaurant)}> Create Event </button>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
export default MyMap;
