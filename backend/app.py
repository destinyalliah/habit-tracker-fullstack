from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Habit model
class Habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    completed = db.Column(db.Boolean, default=False)

# Create tables
with app.app_context():
    db.create_all()

# Routes
@app.route("/habits", methods=["GET"])
def get_habits():
    habits = Habit.query.all()
    return jsonify([{"id": h.id, "name": h.name, "completed": h.completed} for h in habits])

@app.route("/habits", methods=["POST"])
def add_habit():
    data = request.json
    habit = Habit(name=data["name"])
    db.session.add(habit)
    db.session.commit()
    return jsonify({"message": "Habit added"})

if __name__ == "__main__":
    app.run(debug=True)

 