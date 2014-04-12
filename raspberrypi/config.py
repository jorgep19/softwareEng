import requests
import json
# from update import updateSensors

url = "http://homesense.herokuapp.com/api/pi/verify"
input = input("Enter code from website: ");

input_info = {"piCode":input}
user_data = requests.post(url, data=input_info)
# user_data = requests.urlopen(url)
# user = json.loads(user_data.readall().decode('utf-8'))

print(user_data.text)
f = open('user.json', 'w')
user_json= user_data.json()
f.write(json.dumps(user_json["data"]))
        
f.close()
