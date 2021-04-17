import os
from flask import Flask, send_from_directory, json
from yelp.client import Client
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
import requests
from flask_socketio import SocketIO
from flask_cors import CORS
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__, static_folder='./build/static')
#app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#db = SQLAlchemy(app)

#import models
 
#db.create_all()

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

event_information = {'host':'host1','event_name':'','event_description':'','restaurant':'','location':'','event_date':'','event_time':''}

@SOCKETIO.on('connect')
def on_connect():
    ''' Connecting user'''
    print('user connected')

@SOCKETIO.on('recs')
def get_restaurant_recs(data):  # data is whatever arg you pass in your emit call on client
    
    
    print(data)
    PARAMS = {'term':'restaurant', 'limit': 5, 'radius': int(data['radio']), 'location': data['addy']}

    response = requests.get(url=ENDPOINT, params=PARAMS, headers=HEADERS)

    business_data = response.json()
    
    results={}
    for i in range(5):
        results[business_data['businesses'][i]['name']] = business_data['businesses'][i]['location']['display_address'][0]
  
    print("results",results)
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    SOCKETIO.emit('recs',  {"results":results }, broadcast=True, include_self=True)

@SOCKETIO.on('recommendations')
def get_recomendations(data):
    print("RECOOMENDATION",data)
    restaurant = data['restaurant']
    location=data['location']
    event_information['restaurant']=restaurant
    event_information['location'] = location
 
    
@SOCKETIO.on('event_info')
def get_event_info(data):
    print("Event Info", data)
    event_name=data['event_name']
    event_description=data['event_description']
    event_date=data['event_date']
    event_time=data['event_time']
    event_information['event_name']=event_name
    event_information['event_description']=event_description
    event_information['event_date']=event_date
    event_information['event_time']=event_time
   
    
    date_time = event_date+' '+ event_time+ '%b %d %Y %I:%M%p'
    datetime_object = datetime.strptime(date_time)
    print(datetime_object)
  
    
    
    datetime_object = datetime.strptime('Jun 1 2005  1:33PM', '%b %d %Y %I:%M%p')
    
    


if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call socketio.run with app arg
    SOCKETIO.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )

