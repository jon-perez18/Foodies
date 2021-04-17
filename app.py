import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from yelp.client import Client
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
import requests

app = Flask(__name__, static_folder='./build/static')

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

import models
 
db.create_all()

cors = CORS(app, resources={r"/*": {"origins": "*"}})
SOCKETIO = SocketIO(app,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)
                    
MY_API_KEY = os.getenv('MY_API_KEY')
ENDPOINT='https://api.yelp.com/v3/businesses/search'
HEADERS = {'Authorization':'bearer %s' % MY_API_KEY}


@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

  
@SOCKETIO.on('login')
def on_login(data_name, data_email):
    SOCKETIO.emit('login', data_name, data_email, broadcast=True, include_self=False)

    all_users = models.User.query.all()
    names = []
    emails = []
    for user in all_users:
        names.append(user.name)
        emails.append(user.email)

    if data_name not in names:
        new_user = models.User(username=data_name, email=data_email)
        db.session.add(new_user)
        db.session.commit()
        names.append(data_name)
        emails.append(data_email)

    print(names)
    print(emails)


@SOCKETIO.on('recs')
def get_restaurant_recs(data):  # data is whatever arg you pass in your emit call on client
    """on chat"""
    print(data)
    PARAMS = {'term':'restaurant', 'limit': 5, 'radius': int(data['radio']), 'location': data['addy']}
    
    response = requests.get(url=ENDPOINT, params=PARAMS, headers=HEADERS)

    business_data = response.json()
    results={}
    for i in range(5):
        results[business_data['businesses'][i]['name']] = business_data['businesses'][i]['location']['display_address'][0]
  
    print(results)
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    SOCKETIO.emit('recs', data, broadcast=True, include_self=False)


if __name__ == "__main__":
    SOCKETIO.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
