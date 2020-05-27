#!/usr/bin/python3
from flask import *
from . import db
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_login import login_user
import sys

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login_post():
    email = request.json['email']
    print(email, file=sys.stderr)
    password = request.json['password']
    session['email'] = email
    print(email, file=sys.stderr)
    remember = True if request.json.get('remember') else False

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        flash('Please check your login details and try again.')
        return redirect('/')

    if not email or not password:
        flash('Please check your login details and try again.')
        return redirect('/')

    login_user(user, remember=remember)
    ret = {'status': 'ok'}
    return jsonify(ret), 201
    #return render_template("user_dashboard.html", current_user=user)

@auth.route('/signup')
def signup():
    return render_template('signup.html')

@auth.route('/signup', methods=['POST'])
def signup_post():
    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')

    user = User.query.filter_by(email=email).first()
    if user:
        flash('Email address already exists')
        return redirect(url_for('auth.signup'))
    
    new_user = User(
        email=email,
        name=name,
        password=generate_password_hash(password, method='sha256')
    )

    db.session.add(new_user)
    db.session.commit()

    return redirect(url_for('auth.login'))

@auth.route('/logout')
def logout():
    return render_template('logout.html')