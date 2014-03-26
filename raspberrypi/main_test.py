import urllib.parse
import urllib.request
import temperature
import time
import json


timestamp = time.strftime("%Y-%m-%d-%H-%M-%S")

d = json.loads(open('user.txt').readall().decode('utf-8'))

print d

while(true):
    jdata = {"email":email, "sensor":sensor, "value":temp, "date":timestamp, "device":device}
    data = urllib.parse.urlencode(jdata)
    binary_data = data.encode('ascii')
    req = urllib.request.Request("http://www.homesense.abovotec.com/api.php/sensor/put_data/?", binary_data)
    urllib.request.urlopen(req)
    i += 1
    time.sleep(25)  # delays for 3 seconds

	

def getTemperature():
	tfile = open("/sys/bus/w1/devices/10-000802824e58/w1_slave")
	text = tfile.read()
	tfile.close()
	temperature_data = text.split()[-1]
	temperature = float(temperature_data[2:])
	temperature = temperature / 1000
	return temperature
