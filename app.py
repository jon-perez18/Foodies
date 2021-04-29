"""Foodies"""
import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
import requests


load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)

import models
DB.create_all()

SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)

MY_API_KEY = os.getenv('MY_API_KEY')
ENDPOINT = 'https://api.yelp.com/v3/businesses/search'
HEADERS = {'Authorization': 'bearer %s' % MY_API_KEY}


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    """index"""
    return send_from_directory('./build', filename)


EVENT_INFO = {
    'host': '',
    'event_name': '',
    'event_description': '',
    'restaurant': '',
    'location': '',
    'event_date': '',
    'event_time': ''
}


@SOCKETIO.on('connect')
def on_connect():
    ''' Connecting user'''
    print('user connected')


@SOCKETIO.on('login')
def on_login(data_name, data_email):
    """logging in user"""

    SOCKETIO.emit('login', {data_name, data_email}, include_self=True)
    EVENT_INFO['host'] = data_name['username']

    all_users = models.Login.query.all()
    names = []
    emails = []
    for user in all_users:
        names.append(user.name)
        emails.append(user.email)

    if data_name.get('username') not in names:
        new_user = models.Login(name=data_name.get('username'),
                               email=data_email.get('email'))
        DB.session.add(new_user)
        DB.session.commit()

        names.append(data_name.get('username'))
        emails.append(data_email.get('email'))
    
    print(names)
    print(emails)
    

    SOCKETIO.emit('login', data_name, broadcast=True, include_self=True)
    
    


@SOCKETIO.on('recs')
def get_restaurant_recs(
        data):  # data is whatever arg you pass in your emit call on client
    """get restaurant recs"""
    print(data)
    params = {
        'term': 'restaurant',
        'limit': 5,
        'radius': int(data['radio']),
        'location': data['addy']
    }

    response = requests.get(url=ENDPOINT, params=params, headers=HEADERS)

    business_data = response.json()
    #print(business_data['businesses'][0]["rating"])
    #print(business_data['businesses'][0]["phone"])
    results = {}
    results2 ={}
    for i in range(5):
     
        results[business_data['businesses'][i]['name']] = business_data[
            'businesses'][i]['location']['display_address'][0]+" "+business_data[
            'businesses'][i]['location']['display_address'][1]
    for i in range(5):
        restaurant = business_data['businesses'][i]['name']
        location = business_data[
            'businesses'][i]['location']['display_address'][0]+" "+business_data[
            'businesses'][i]['location']['display_address'][1]
        lat = business_data['businesses'][i]['coordinates']['latitude']
        longi = business_data['businesses'][i]['coordinates']['longitude']
        ratings = business_data['businesses'][i]["rating"]
        phone = business_data['businesses'][i]["phone"]
        results2[i] = {'restaurant':restaurant, 'location':location,'lat': lat,"longi": longi,'ratings':ratings,'phone':phone }
    print("results", results2)
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    SOCKETIO.emit('recs', {"results": results, 'result2':results2
    },
                  broadcast=True,
                  include_self=True)
    return results


@SOCKETIO.on('recommendations')
def get_recomendations(data):
    """get recommendations"""
    # print("RECOMMENDATION", data)
    restaurant = data['restaurant']
    location = data['location']
    EVENT_INFO['restaurant'] = restaurant
    EVENT_INFO['location'] = location


@SOCKETIO.on('event_info')
def get_event_info(data):
    """get event info"""
     
    print(data)
    host_name = data['host']
    event_name = data['eventName']
    event_description = data['eventDescription']
    event_date = data['eventDate']
    event_time = data['eventTime']
    print(int(event_time[:2]) - 12)
    hour = int(event_time[:2])
    if hour > 12:
        new_hour = hour - 12
        time = str(new_hour) + event_time[2:] + ' PM'
    elif hour == 00:
        new_hour = "12"
        time = new_hour + event_time[2:] + ' AM'
        
    else:
        time = event_time + ' AM'
    # print(time)

    EVENT_INFO['host'] = host_name
    EVENT_INFO['event_name'] = event_name
    EVENT_INFO['event_description'] = event_description
    EVENT_INFO['event_date'] = event_date
    EVENT_INFO['event_time'] = time
    # print(event_time[:2])
    add_event_to_db(EVENT_INFO)

    SOCKETIO.emit("event_info", {'event_info': EVENT_INFO},
                  broadcast=True,
                  include_self=True)
    return time


def add_event_to_db(event): #event is a dictionary of event info
    """adding an event to the databse"""
    att_list = []
    att_list.append(event['host'])

    # print(att_list)

    new_event = models.Event(host=event['host'],
                             event_name=event['event_name'],
                             event_description=event['event_description'],
                             restaurant=event['restaurant'],
                             location=event['location'],
                             event_date=event['event_date'],
                             event_time=event['event_time'],
                             attendees=att_list)
    DB.session.add(new_event)
    DB.session.commit()

    return new_event
    

def get_events():
    '''Returns list of events from db'''
    events = models.Event.query.all()
    events = list(map(lambda event: [event.host, event.event_name, event.event_description, event.restaurant, event.location, event.event_date, event.event_time, event.attendees], events))
    # print(events)
    return events

def add_attendee(name, user, new_list):
    """Adding attendees to an event in the database"""
    # print(new_list)
    new_list.append(user)
    # print(new_list)
    change_event = models.Event.query.filter_by(event_name=name).first()
    change_event.attendees = new_list
    DB.session.merge(change_event)
    DB.session.commit()
    on_events()

def leave_event(name, user, current_list):
    '''Leaving event'''
    current_list.remove(user)
    change_event = models.Event.query.filter_by(event_name=name).first()
    change_event.attendees = current_list
    DB.session.merge(change_event)
    DB.session.commit()
    on_events()


@SOCKETIO.on("events")
def on_events():
    '''Returns a list of events from db'''
    events_list = get_events()
    # print("on events func")
    SOCKETIO.emit("events", {"events": events_list}, broadcast=True, include_self=True)

@SOCKETIO.on("change_attendees")
def on_change_attendee(data):
    '''Changing the attendees list of an event'''
    print(data)
    add_attendee(data['name'], data['user'], list(data['attendeeList']))
    # SOCKETIO.emit("events", {"events": events_list} broadcast=True, include_self=True)

@SOCKETIO.on("leave_event")
def on_leave_event(data):
    '''Leaving an event'''
    print(data)
    leave_event(data['name'], data['user'], list(data['attendeeList']))


if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call socketio.run with app arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
