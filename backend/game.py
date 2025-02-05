import requests

BASE_URL = "http://127.0.0.1:5000"

# To create a new game
def create_game(game_data):
    response = requests.post(f"{BASE_URL}/games", json=game_data)
    if response.status_code == 201:
        print(response.json())  
    else:
        print("Error:", response.json())  

# To get game details
def get_game(game_name):
    response = requests.get(f"{BASE_URL}/games/{game_name}")
    if response.status_code == 404:
        print("Game not found.")
    else:
        print(response.json())

# List all games
def list_games():
    response = requests.get(f"{BASE_URL}/games")
    print(response.json())

# Join a game
def join_game(game_name, participant):
    response = requests.post(f"{BASE_URL}/games/{game_name}/join", json={"participant": participant})
    print(response.json())

# Leave a game
def leave_game(game_name, participant):
    response = requests.post(f"{BASE_URL}/games/{game_name}/leave", json={"participant": participant})
    print(response.json())

if __name__ == "__main__":
    # Example 
    game_data = {
        "host": "Alice",
        "game_name": "Chess Night",
        "game_type": "Board Game",
        "date": "2025-02-10",
        "location": "Pub XYZ",
        "max_players": 4
    }

    # Create a game
    create_game(game_data)

    # List games
    list_games()

    # Get game details
    get_game("Chess Night")

    # Join game
    join_game("Chess Night", "Bob")
    join_game("Chess Night", "Charlie")
    join_game("Chess Night", "David")
    join_game("Chess Night", "Eve")  

    # Leave game
    leave_game("Chess Night", "Bob")

    # Get updated game details
    get_game("Chess Night")
