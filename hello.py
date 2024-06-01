from flask import Flask, render_template, jsonify
from categories import getCategoryData



app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
 
@app.route('/categories')
def categories():
    categories = getCategoryData()  #  fetches the categories from the API
    return jsonify(categories)


