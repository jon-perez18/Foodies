from app import DB

class Login(DB.Model):
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(80), unique=True, nullable=False)
    email = DB.Column(DB.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<Login %r>' % self.name

class Event(DB.Model):
    '''Event Table/Model for database'''
    event_id = DB.Column(DB.Integer, primary_key=True)
    host = DB.Column(DB.String(80), nullable=False)
    event_name = DB.Column(DB.String(300), nullable=False)
    event_description = DB.Column(DB.String(300), nullable=False)
    restaurant = DB.Column(DB.String(150), nullable=False)
    location = DB.Column(DB.String(80), nullable=False)
    event_date = DB.Column(DB.String(80), nullable=False)
    event_time = DB.Column(DB.String(80), nullable=False)
    attendees = DB.Column(DB.ARRAY(DB.String(50)), nullable=False)

    def __repr__(self):
        return '<Event %r>' % self.event_name
