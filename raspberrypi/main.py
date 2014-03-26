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
users = json.loads(jsonstr)

print(users)
sensors_data = {'Temp':45}
jdata = {'custID':users['custID'], 'deviceID':users['deviceID'], 'data':sensors_data}
print (jdata)
# urllib.request.urlopen(req)
	
	

