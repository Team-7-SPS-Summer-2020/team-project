import requests
url = ('http://newsapi.org/v2/top-headlines?'
       'country=us&'
       'apiKey=96317a20b027446da228dce495ce6af7')
response = requests.get(url)
print(response.json())