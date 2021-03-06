#!/usr/bin/python3
from flask import *
from flask import Flask
from . import db
from .models import User
from .models import pgn
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import requests
import sys
from datetime import datetime
import time
import redis
import hashlib
import json
from flask_cors import CORS, cross_origin

main = Blueprint('main', __name__)
CORS(main, support_credentials=True)
r = redis.Redis()

@main.route('/')
def index():
    return render_template('webindex.html')

@main.route('/status')
@cross_origin(supports_credentials=True)
def status():
    response = {'status': 'okay'}
    return response

@main.route('/homescreen')
def home():
    return render_template('dashboard.html')

@main.route('/deletepgn', methods=['POST'])
def deletepgn():
    pg = request.form['pgntodel']
    q = db.session.query(pgn).filter_by(pgnId=pg).one()
    db.session.delete(q)
    db.session.commit()
    return redirect(url_for('main.dashboard'))


@main.route('/filterdb', methods=['POST'])
def filterdb():
    Folder = request.form['folder']
    gamelist = []
    games = db.session.query(pgn).all()
    for game in games:
        gamelist.append(game.game)

    pgnlist = []
    pgns = db.session.query(pgn).filter_by(folder=Folder).all()
    for pg in pgns:
        pgnlist.append({
            'name': str(pg.fileName),
            'game': pg.game,
            'folder': pg.folder,
            'frame': pg.frame,
            'pgnId': pg.pgnId
        })
    return render_template(
        'filterdb.html',
        games=gamelist,
        folder=Folder,
        pgnlist=pgnlist
    )

@main.route('/lichessupload', methods=['POST', 'GET'])
def lichessupload():
    if request.method == 'POST':

        if request.form['name']:
            game_name = request.form['name']

        game_string = request.form['gamestring']

        if str(game_string)[:5] == "liche":
            game_string = game_string[12:]

        elif str(game_string)[:5] == "http:":
            game_string = game_string[19:]
            print(game_string, file=sys.stderr)

        elif str(game_string)[:5] == "https":
            game_string = game_string[20:]

        if len(game_string) != 8:
            game_string = game_string[:8]

        game_folder = request.form['folder']
        lciframe = "https://lichess.org/embed/" + game_string + "?theme=auto&bg=auto"
        #uid = current_user.id

        re = requests.get("{}/{}?{}".format(
            'https://lichess.org/game/export',
            game_string,
            'pgnInJson=true'
        ))
        try:
            new_pgn = pgn(
                #userId=uid,
                game=re.text,
                fileName=game_name,
                folder=game_folder,
                frame=lciframe
            )
        except:
            return 'false'
        print(re.text, file=sys.stderr)
        db.session.add(new_pgn)
        db.session.commit()
        return 'true'

    return 'false'

@main.route('/lichessliterate', methods=['POST', 'GET'])
def lichessliterate():
    if request.method == 'POST':
        try:
            current_user = User.query.filter_by(email=session['email']).first()
        except:
            return render_template('webindex.html')

        uid = current_user.id
        game_string = request.form['gamestring']

        if str(game_string)[:5] == "liche":
            game_string = game_string[12:]

        elif str(game_string)[:5] == "http:":
            game_string = game_string[19:]

        elif str(game_string)[:5] == "https":
            game_string = game_string[20:]

        if len(game_string) != 8:
            game_string = game_string[:8]

        re = requests.get("{}/{}".format(
            'https://lichess.org/game/export',
            game_string),
            params={
                "opeing": "true",
                "clocks": "true",
                "literate": "true",
                "evals": "true"
            }
        )
        if request.form['name']:
            game_name = request.form['name']
    
        game_folder = request.form['folder']
        lciframe = "{}{}{}".format(
            "https://lichess.org/embed/",
            game_string,
            "?theme=wood4&bg=dark"
        )
        new_pgn = pgn(
            userId=uid,
            game=re.text,
            fileName=game_name,
            folder=game_folder,
            frame=lciframe
        )
        db.session.add(new_pgn)
        db.session.commit()
        return redirect(url_for('main.dashboard'))

    return render_template('lichessupload.html')


@main.route('/mydatabase', methods=['GET'])
def mydatabase():
    gamelist = []
    games = db.session.query(pgn).all()

    try:
        current_user = User.query.filter_by(email=session['email']).first()
    except Exception as e:
        session['email'] ='guh'
        print(str(session.items()), file=sys.stderr)
        return '222'
    games = db.session.query(pgn).filter_by(userId=current_user.id).all()

    for game in games:
        gamelist.append(game.game)

    pgnlist = []
    pgns = db.session.query(pgn).all()

    for pg in pgns:
        pgnlist.append({
            'name': str(pg.fileName),
            'game': pg.game,
            'folder': pg.folder,
            'frame': pg.frame
        })

    folderlist = []
    folders = db.session.query(pgn.folder).all()

    for folder in folders:
        folderlist.append(str(folder))

    folderlist = list(dict.fromkeys(folderlist))

    ret = {"games": gamelist, "folders": folderlist, "pgnlist": pgnlist}
    
    return ret


@main.route('/uploadpgn', methods=['POST', 'GET'])
def uploadpgn():
    if request.method == 'POST':
        try:
            current_user = User.query.filter_by(email=session['email']).first()
        except:
            return "1"

        uid = current_user.id

        if 'pgnfile' not in request.files:
            flash('No file found')
            return redirect(request.url)

        pgnfile = request.files['pgnfile']

        if pgnfile.filename == '':
            flash('No selected file')
            return redirect(request.url)

        if pgnfile:
            pgndata = pgnfile.read()
            new_pgn = pgn(
                userId=uid,
                game=pgndata,
                fileName=pgnfile.filename,
                folder="system uploads"
            )
            db.session.add(new_pgn)
            db.session.commit()
    return '0'

@main.route('/exportall', methods=['GET', 'POST'])
def exportall():
    if request.method == 'POST':
        try:
            current_user = User.query.filter_by(email=session['email']).first()
        except:
            return render_template('webindex.html')       
        
        username = request.form['username']
        if request.form['exportamount']:
            gamelen = int(request.form["exportamount"])
        gamelen = "null"

        startdate = request.form['startdate']
        startdate = time.mktime(time.strptime(startdate, "%m/%d/%Y"))

        enddate = request.form['enddate']
        enddate = time.mktime(time.strptime(enddate, "%m/%d/%Y"))
        print((startdate * 1000, enddate * 1000), file=sys.stderr)

        re = requests.get("{}{}".format(
            "https://lichess.org/api/games/user/",
            username
            ), 
            params={
                "pgnInJson": "true",
                "opening": "true",
                "since": int(startdate) * 1000,
                "until": int(enddate) * 1000,
                "max": gamelen,
            },
            headers={
                "Accept": "application/x-ndjson"
            },
            stream=True
        )
        with open("Trevor_lichess_download.json", 'w') as fp:
            fp.write(re.text)

        with open("Trevor_lichess_download.json", 'r') as fp:
            game_list = fp.readlines()
        
        json_games = []
        year_list = []
        month_list = []
        folderlist = []
        for line in game_list:
            line = json.loads(line)
            time_stamp = int(line["createdAt"])
            time_stamp = datetime.utcfromtimestamp(time_stamp/1000).strftime(
                '%Y-%m-%d %H:%M:%S'
            )
            ts = int(line["createdAt"])
            time_stamp2 = datetime.utcfromtimestamp(ts/1000).strftime(
                '%Y'
            )
            time_stamp3 = datetime.utcfromtimestamp(ts/1000).strftime(
                '%m'
            )
            json_games.append(line)
            year_list.append(time_stamp2)
            year_list = list(dict.fromkeys(year_list))
            month_list.append(time_stamp3)
            month_list = list(dict.fromkeys(month_list))   

        uid = current_user.id
        for game in json_games:
            folder_name = datetime.utcfromtimestamp(game["createdAt"]/1000).strftime(
                '%Y-%m'
            )
            game_date = datetime.utcfromtimestamp(game["createdAt"]/1000).strftime(
                '%Y-%m-%d %H:%M:%S'
            )
            folder_name = "{} - {}".format("lichess upload", folder_name)
            lciframe = "{}{}{}".format(
                "http://lichess.org/embed/",
                game["id"],
                "?theme=wood4&bg=dark"
            )
            try:
                new_pgn = pgn(
                    userId=uid,
                    game=game["pgn"],
                    fileName="{} - {} - {} - id: {}".format(
                        game["opening"]["name"],
                        game["speed"],
                        game_date,
                        game["id"]
                    ),
                    folder=folder_name,
                    frame=lciframe
                )
                db.session.add(new_pgn)
                db.session.commit()
            except:
                pass
        return redirect(url_for('main.dashboard'))
    return render_template('lichessexportall.html')


@main.route('/nothingyet', methods=['GET'])
def nothingyet():
    q = db.session.query(pgn).all()
    for pg in q:
        db.session.delete(pg)
    db.session.commit()
    return '0'

@main.route('/editpgn', methods=['GET', 'POST'])
def editpgn():
    pg = request.form['editpgn']
    q = db.session.query(pgn).filter_by(pgnId=pg).one()
    return render_template('editpgn.html', pgn=q.game, pgnname=q.fileName, id=q.pgnId)

@main.route('/downloadjsonpgn', methods=['GET', 'POST'])
def downloadjsonpgn():
    pass

@main.route('/downloadpgn', methods=['GET', 'POST'])
def downloadpgn():
    pass

@main.route('/switchfolder', methods=['GET', 'POST'])
def switchfolder():
    if request.method == "POST":
        pg = request.form["foldername"]
        pgid = request.form["gameid"]
        db.session.query(pgn).filter(pgn.pgnId == pgid).update({'folder': pg})
        db.session.commit()
        return redirect(url_for("main.dashboard"))
    return render_template("form.html")
