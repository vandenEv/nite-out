from flask import Flask, request, jsonify

app = Flask(__name__)

# Store games
games = {}

class Game:
    def __init__(self, host, game_name, game_type, date, location, max_players):
        self.set_host(host)
        self.set_game_name(game_name)
        self.set_game_type(game_type)
        self.set_date(date)
        self.set_location(location)
        self.set_max_players(max_players)
        self.__participants = []

    # Get functions
    def get_game_details(self):
        return {
            "host": self.__host,
            "game_name": self.__game_name,
            "game_type": self.__game_type,
            "date": self.__date,
            "location": self.__location,
            "max_players": self.__max_players,
            "participants": self.__participants
        }

    # Set functions
    def set_host(self, host):
        self.__host = host

    def set_game_name(self, game_name):
        self.__game_name = game_name

    def set_game_type(self, game_type):
        self.__game_type = game_type

    def set_date(self, date):
        self.__date = date

    def set_location(self, location):
        self.__location = location

    def set_max_players(self, max_players):
        self.__max_players = max_players

    # Add participant
    def add_participant(self, participant):
        if len(self.__participants) < self.__max_players:
            self.__participants.append(participant)
            return f"{participant} has joined the game."
        else:
            return "Game is full."

    # Remove participant
    def remove_participant(self, participant):
        if participant in self.__participants:
            self.__participants.remove(participant)
            return f"{participant} has left the game."
        return "Participant not found."

# API Route (Test)
@app.route("/tests")
def tests():
    return {"tests": ["Hi I am Test 1", "And I am Test 2", "And don't forget test 3"]}

# Create a new game
@app.route("/games", methods=["POST"])
def create_game():
    data = request.json
    if "game_name" not in data:
        return jsonify({"error": "Game name is required"}), 400

    game_name = data["game_name"]
    if game_name in games:
        return jsonify({"error": "Game already exists"}), 400

    game = Game(
        data["host"], data["game_name"], data["game_type"],
        data["date"], data["location"], data["max_players"]
    )
    games[game_name] = game
    return jsonify({"message": f"Game '{game_name}' created successfully!"}), 201

# Get game details
@app.route("/games/<game_name>", methods=["GET"])
def get_game(game_name):
    game = games.get(game_name)
    if not game:
        return jsonify({"error": "Game not found"}), 404
    return jsonify(game.get_game_details()), 200

# List all games
@app.route("/games", methods=["GET"])
def list_games():
    return jsonify({"games": [game.get_game_details() for game in games.values()]}), 200

# Add participant to game
@app.route("/games/<game_name>/join", methods=["POST"])
def join_game(game_name):
    game = games.get(game_name)
    if not game:
        return jsonify({"error": "Game not found"}), 404

    data = request.json
    participant = data.get("participant")
    if not participant:
        return jsonify({"error": "Participant name is required"}), 400

    message = game.add_participant(participant)
    return jsonify({"message": message}), 200

# Remove participant from game
@app.route("/games/<game_name>/leave", methods=["POST"])
def leave_game(game_name):
    game = games.get(game_name)
    if not game:
        return jsonify({"error": "Game not found"}), 404

    data = request.json
    participant = data.get("participant")
    if not participant:
        return jsonify({"error": "Participant name is required"}), 400

    message = game.remove_participant(participant)
    return jsonify({"message": message}), 200

# Run Flask application
if __name__ == "__main__":
    app.run(debug=True)
