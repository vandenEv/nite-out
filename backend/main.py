from flask import request, jsonify
from config import app, db
from Gamer import Gamer
from Publican import Publican
from game import Game


## GET REQUESTS
@app.route("/gamer", methods=["GET"])
def get_gamer():

@app.route("/publican", methods=["GET"])
def get_publican():

@app.route("/game", methods=["GET"])
def get_game():

## POST REQUESTS
@app.route("/create_gamer", methods=["POST"])
def create_gamer():

@app.route("/create_publican", methods=["POST"])
def create_publican():

@app.route("/create_game", methods=["POST"])
def create_game():

## PATCH REQUESTS
@app.route("/update_gamer/<int:gamer_id>", methods=["PATCH"])
def update_gamer():

@app.route("/update_publican/<int:publican_id>", methods=["PATCH"])
def update_publican():

@app.route("/update_game/<int:game_id>", methods=["PATCH"])
def update_game():


## Running this file as main
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug = True)
