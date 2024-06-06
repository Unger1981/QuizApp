
    
import requests

def processSelection(selected_categoryID, selected_difficult):
    url = f"https://opentdb.com/api.php?amount=10&category={selected_categoryID}&difficulty={selected_difficult}&type=multiple"
    # Diese Funktion sollte die empfangenen Daten verarbeiten und eine Antwort zurückgeben
    headers = {
        'Cookie': 'PHPSESSID=62b0a3ff1df6eacb1c601e27b999deea'
    }

    response = requests.get(url, headers=headers)
    data = response.json()
    

    return data