#!/usr/bin/python3
from flask import Flask
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_session import Session
import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.secret_key = os.urandom(24)
    app.config['SESSION_TYPE'] = 'filesystem'
    Session(app)
    CORS(app, support_credentials=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'

    db.init_app(app)

    config = {
    "DEBUG": True,
    "CACHE_TYPE": "simple",
    "CACHE_DEFAULT_TIMEOUT": 300000
    }

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    from .models import User
    from .models import pgn

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    @app.after_request
    def add_header(response):
        response.headers['X-Frame-Options'] = "ALLOW-FROM *"
        response.headers['Access-Control-Allow-Credentials'] = "true"
        response.headers['SameSite'] = "None"
        response.headers.add('Set-Cookie','cross-site-cookie=bar; SameSite=None; Secure')
        return response

    # blueprint for auth routes in our app
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    # blueprint for non-auth parts of app
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
