import os
from flask import Flask, send_from_directory
from yelp.client import Client
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
import requests

app = Flask(__name__, static_folder='./build/static')
MY_API_KEY = os.getenv('MY_API_KEY')
ENDPOINT='https://api.yelp.com/v3/businesses/search'
HEADERS = {'Authorization':'bearer %s' % MY_API_KEY}

PARAMS = {'term':'restuarant', 'limit': 5, 'radius': 10000, 'location': 'Princeton'}

response = requests.get(url=ENDPOINT, params=PARAMS, headers=HEADERS)

business_data = response.json()
results={}
for i in range(5):
    results[business_data['businesses'][i]['name']] = business_data['businesses'][i]['location']['display_address'][0]
  
print(results)
@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
