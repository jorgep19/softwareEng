import urllib.parse
import urllib.request
import json


def updateSensors(userID):
	url= "http://api.transloc.com/1.2/arrival-estimates.json?agencies=116"
	#url+=userID
	sensor_data= urllib.request.urlopen(url)
	sensor= json.loads(sensor_data.readall().decode('utf-8'))
	with open('sensors.json', 'w') as outfile:
		json.dump(sensor, outfile)

