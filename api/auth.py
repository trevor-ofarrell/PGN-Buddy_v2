#!/usr/bin/python3
from flask import *
from . import db
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_login import login_user
import sys
from flask_cors import CORS

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login_post():
    email = request.form.get('email')
    password = request.form.get('password')
    session['email'] = request.form['email']
    remember = True if request.form.get('remember') else False

    user = User.query.filter_by(email=email).first()

    """if not user or not check_password_hash(user.password, password):
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.login'))

    if not email or not password:
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.login'))"""

    login_user(user, remember=remember)
    print(str(session.items()), file=sys.stderr)
    return '0'

@auth.route('/signup', methods=['POST'])
def signup_post():
    email = request.form.get('email')
    password = request.form.get('password')

    user = User.query.filter_by(email=email).first()
    if user:
        flash('Email address already exists')
        return '1'
    
    new_user = User(
        email=email,
        password=generate_password_hash(password, method='sha256')
    )

    db.session.add(new_user)
    db.session.commit()

    return '0'

@auth.route('/logout')
def logout():
    return render_template('logout.html')