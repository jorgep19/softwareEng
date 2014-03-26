import requests
import json
def getTemperature():
	tfile = open("/sys/bus/w1/devices/28-000005947dc5/w1_slave")
	text = tfile.read()
	tfile.close()
	temperature_data = text.split()[-1]
	temperature = float(temperature_data[2:])
	temperature = temperature / 1000 *9.0 /5.0 +32
	return temperature
    

url = "http://10.136.46.30:8080/api/pi/put/data"

sensors_data = [ {'sensID': '13', 'type': '1', 'sdataValue':getTemperature()} ]
headers= {'content-type':'application/json'}
sent_data = {'cusID':2019, 'sensors':  [{'sensID': 13, 'sdataValue':getTemperature()}] }
response = requests.post(url, data=json.dumps(sent_data),headers=headers)
