import urllib.parse
import urllib.request
import json
from update import updateSensors

url= "http://api.transloc.com/1.2/arrival-estimates.json?agencies=116"
input = input("Enter code from website: ");
#url+=input

user_data= urllib.request.urlopen(url)
user= json.loads(user_data.readall().decode('utf-8'))

with open('user.json', 'w') as outfile:
    json.dump(user, outfile)

updateSensors(user['api_version']);
