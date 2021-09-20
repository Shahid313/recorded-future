from application import app, db, ma
import datetime

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    password = db.Column(db.String(100))

    def __init__(self,name,email,password):
        self.name = name
        self.email = email
        self.password = password

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'password')

user_schema = UserSchema()
users_schema = UserSchema(many=True)