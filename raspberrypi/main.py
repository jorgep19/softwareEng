import requests
import time
import json
import RPi.GPIO as GPIO  
from sendEmail import sendEmail
#from Temperature import getTemperature


GPIO.setmode(GPIO.BCM)

def motion(channel): 
        sendEmail(); 
        print ("MOTION DETECTED")
    
# PIN SETUP
GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(4, GPIO.IN) 
GPIO.add_event_detect(17, GPIO.FALLING, callback=motion)  
	
timestamp = time.strftime("%Y-%m-%d-%H-%M-%S")
user_obj=open('user.json').read()
sensor_obj=open('sensors.json').read()

user = json.loads(user_obj)
sensors = json.loads(sensor_obj)



url = "http://homesense.herokuapp.com/api/sensor/put/data/"
sensors_data=[]
for sensor in sensors:
        print(sensor)
        sensors_data.append({'sensId': sensor['sensid'], 'value': getTemperature(),'date':timestamp})
        print(sensors_data)


headers= {'content-type':'application/json'}
sent_data = {'userId':user['userId'], 'sensors':sensors_data}
print(sent_data)
response = requests.post(url, data=json.dumps(sent_data),headers=headers)
print(response.text)

def getTemperature():
	tfile = open("/sys/bus/w1/devices/w1_bus_master1/10-000802824e58/w1_slave")
	text = tfile.read()
	tfile.close()
	temperature_data = text.split()[-1]
	temperature = float(temperature_data[2:])
	temperature = temperature / 1000 *9.0 /5.0 +32
	return temperature


