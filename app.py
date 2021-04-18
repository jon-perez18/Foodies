import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='./build/static')

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

import models
 
db.create_all()

cors = CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)
    
@socketio.on('login')
def on_login(data_name, data_email):
    socketio.emit('login', data_name, broadcast=True, include_self=False)

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


if __name__ == "__main__":
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )