import json
import requests


def updateSensors():
<<<<<<< Updated upstream
	url ="http://homesense.herokuapp.com/api/pi/update"
=======
	url = "http://homesense.herokuapp.com/api/pi/update"
>>>>>>> Stashed changes
	jsonstr = open('user.json').read()
	users = json.loads(jsonstr)
	jdata = {'piId':users['piId']}
	sensor_data = requests.post(url, data=jdata)
	sensor_json= sensor_data.json();
	print(sensor_data.text)
	f = open('sensors.json', 'w')
	f.write(json.dumps(sensor_json["sensors"]))

<<<<<<< Updated upstream
updateSensors()
=======
updateSensors() 
>>>>>>> Stashed changes
