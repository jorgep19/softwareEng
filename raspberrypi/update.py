import json
import requests


def updateSensors():
	url = "http://10.136.46.30:8080/api/pi/verify"
	jsonstr = open('user.json').read()
	users = json.loads(jsonstr)
	jdata = {'custID':users['custID'], 'deviceID':users['deviceID']}
	sensor_data = requests.post(url, data=jdata)
	print(sensor_data.text)
	f = open('sensors.json', 'w')
	f.write(sensor_data.text)

updateSensors()