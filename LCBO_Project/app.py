import requests
from flask import Flask, jsonify, render_template


app = Flask(__name__)

@app.route("/")
def index(): 
    return render_template("index.html")

@app.route("/api/data")
def response(): 
    return jsonify([0])

if __name__ == "__main__":
    app.run()