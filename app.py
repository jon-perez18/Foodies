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


# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

import models

db.create_all()

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



  
@SOCKETIO.on('login')
def on_login(data_name, data_email):
<<<<<<< HEAD
    socketio.emit('login', data_name, broadcast=True, include_self=False)
=======
    SOCKETIO.emit('login', data_name, data_email, broadcast=True, include_self=False)
>>>>>>> 9fe3747721ff91e7293b1e57027a246dd81a7217

    all_users = models.User.query.all()
    names = []
    emails = []
    for user in all_users:
        names.append(user.name)
        emails.append(user.email)

    if data_name not in names:
        new_user = models.User(name=data_name.get('username'), email=data_email.get('email'))
        db.session.add(new_user)
        db.session.commit()
        names.append(data_name.get('username'))
        emails.append(data_email.get('email'))

    print(names)
    print(emails)


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
    print(int(event_time[:2])-12)
    hour=int(event_time[:2])
    if hour>12:
        new_hour = hour-12
        time= str(new_hour)+event_time[2:]+ ' PM'
    else:
        time = event_time + ' AM'
    print(time)
    
        
    event_information['event_name']=event_name
    event_information['event_description']=event_description
    event_information['event_date']=event_date
    event_information['event_time']=time
    print(event_time[:2])
    add_event_to_db(event_information) 
    
    SOCKETIO.emit("event_info", {'event_info':event_information},broadcast=True, include_self=True)
    
   
    
def add_event_to_db(event):
    new_event = models.Event(host=event['host'], event_name=event['event_name'],
    event_description=event['event_description'],restaurant=event['restaurant'],
    location=event['location'],event_date=event['event_date'],
    event_time=event['event_time'])
    db.session.add(new_event)
    db.session.commit()
   


if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call socketio.run with app arg
    SOCKETIO.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )

