from app import db

class Login(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    def __repr__(self):
        return '<User %r>' % self.name
        
      
class Event(db.Model):
    event_id = db.Column(db.Integer,primary_key=True)
    host = db.Column(db.String(80),nullable=False)
    event_name = db.Column(db.String(300),nullable=False)
    event_description = db.Column(db.String(300), nullable=False)
    restaurant = db.Column(db.String(150),nullable = False)
    location = db.Column(db.String(80),nullable =False)
    event_date = db.Column(db.String(80),nullable = False)
    event_time = db.Column(db.String(80),nullable = False)
    def __repr__(self):
        return '<Event %r>' % self.event_name
