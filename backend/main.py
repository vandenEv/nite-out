from flask import Flask
app = Flask(__name__)
gamers = {}
@app.route("/create_user/", methods=["POST"])
def create_user():
    data = request.json
    if "name" in data and "email" in data and "password" in data:
        gamer = Gamer(data["name"], data["email"], data["password"])
        gamers[data["email"]] = gamer
        return jsonify({"message": "User created successfully!"}), 201
    return jsonify({"error": "Missing required fields"}), 400

@app.route("/fetch_user/<email>", methods=["GET"])
def fetch_user(email):
    gamer = gamers.get(email)
    if gamer:
        return jsonify(gamer.gamerinformation())
    return jsonify({"error": "User not found"}), 404

@app.route("/update_user/", methods=["PUT"])
def update_user():
    data = request.json
    email = data.get("email")
    gamer = gamers.get(email)
    if gamer:
        if "name" in data:
            gamer.set_name(data["name"])
        if "password" in data:
            gamer.set_password(data["password"])
        return jsonify({"message": "User updated successfully!"})
    return jsonify({"error": "User not found"}), 404

if __name__ == "__main__":
    app.run(debug = True)