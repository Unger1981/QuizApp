
import requests
def getCategoryData():

    url = "https://opentdb.com/api_category.php"

    payload = {}
    headers = {
    'Cookie': 'PHPSESSID=62b0a3ff1df6eacb1c601e27b999deea'
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    data = response.json()


    category_names =[]
    for category in data['trivia_categories']:
        category_names.append(category['name'])
   
    return {'categories': category_names}
print(getCategoryData())