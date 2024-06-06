from flask import Flask, render_template, jsonify , request
from categories import getCategoryData
from submit import processSelection



app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
 
@app.route('/categories')
def categories():
    categories = getCategoryData()  #  fetches the categories from the API
    return jsonify(categories)

@app.route('/submit',methods=['GET'])
def submitSelection():
   
    selected_categoryID = request.args.get('selectedCategoryID')
    selected_difficult = request.args.get('selectedDifficult')

    # Überprüfen, ob die Daten korrekt empfangen wurden
    if not selected_categoryID or not selected_difficult:
        return jsonify({'error': 'Missing data'}), 400

    # Verarbeitet die Auswahl
    result = processSelection(selected_categoryID, selected_difficult)
    return jsonify(result)