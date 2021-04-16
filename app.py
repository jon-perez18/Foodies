import os
from flask import Flask, send_from_directory, json
from yelp.client import Client
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
import requests
from flask_socketio import SocketIO


app = Flask(__name__, static_folder='./build/static')
SOCKETIO = SocketIO(app,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)
                    
@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)
 
@SOCKETIO.on('connect')
def on_connect():
    ''' Connecting user'''
    print('user connected')
"""@SOCKETIO.on('recs')
def get_restaurant_recs(data):  # data is whatever arg you pass in your emit call on client
    
    
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
"""
@SOCKETIO.on('recommendations')
def get_recomendations(data):
    print(data)
    


if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call socketio.run with app arg
    SOCKETIO.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )

