import os
from flask import Flask, send_from_directory, json
#from yelp.client import Client
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
import requests
from flask_socketio import SocketIO


app = Flask(__name__, static_folder='./build/static')
SOCKETIO = SocketIO(app,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)
                    



#results = {"res1":"add1","res2":"add2","res3":"add3","res4":"add4","res5":"add5"}
####SOCKETIO.emit('recommendations', {"results":results},
              #broadcast=True,
              #include_self=True)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)