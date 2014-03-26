import requests
import time
import json
# import RPi.GPIO as GPIO  
# GPIO.setmode(GPIO.BCM)

# PIN SETUP
# GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)  

# GPIO.add_event_detect(23, GPIO.RISING, callback=motion)  

def motion(channel):  
    print "MOTION DETECTED"  

	
timestamp = time.strftime("%Y-%m-%d-%H-%M-%S")

jsonstr = open('user.json').read()
user = json.loads(jsonstr)

print(users)
sensors_data = [ {'id': id, 'type': 'Temperature', 'value':45},{'id': id, 'type': 'Humidity', 'value':45}  ]
jdata = {'custID':user['custID'], 'deviceID':user['deviceID'], 'data':sensors_data, 'time':Timestampo}
print (jdata)
# urllib.request.urlopen(req)
	
	

