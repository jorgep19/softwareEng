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
f.write(user_data.text)

#update.UpdateSensors()

# with open('user.json', 'w') as outfile:
#   outfile.write(user_data.text, outfile)

# updateSensors(user['api_version']);
