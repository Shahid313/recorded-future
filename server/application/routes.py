from flask import Flask, jsonify, request
from application import db
from application import app
from application.models import *
from werkzeug.security import generate_password_hash,check_password_hash

@app.route("/signup", methods=['POST'])
def signup():
    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    hashed_password = generate_password_hash(password, method='sha256')
    user = Users.query.filter_by(email=email).first()
    if user:
        return jsonify({'isExist':True})
    else:
        users = Users(name,email,hashed_password)
        db.session.add(users)
        db.session.commit()
        return user_schema.jsonify({'isExist':False, 'users':users})

@app.route("/signin", methods=['POST'])
def signin():
    email = request.form.get('email')
    password = request.form.get('password')
    user = Users.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        users = user_schema.dump(user)
        return jsonify({'loggedIn':True, 'user':users})
    else:
        return jsonify({'loggedIn':True})

@app.route("/reset_password", methods=['POST'])
def reset_password():
    email = request.form.get('email')
    password = request.form.get('password')
    new_password = request.form.get('newPassword')
    user = Users.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        user.password = generate_password_hash(new_password, method='sha256')
        db.session.commit()
        return jsonify({'isReset':True})
    else:
        return jsonify({'isReset':False})

