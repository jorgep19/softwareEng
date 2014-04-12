import json
import requests


def updateSensors():
	url ="http://homesense.herokuapp.com/api/pi/update"
	jsonstr = open('user.json').read()
	users = json.loads(jsonstr)
	jdata = {'piId':users['piId']}
	sensor_data = requests.post(url, data=jdata)
	print(sensor_data.text)
	f = open('sensors.json', 'w')
	f.write(sensor_data.text)

updateSensors()
