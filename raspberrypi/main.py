import requests
import time
import json
import RPi.GPIO as GPIO  
import sendEmail
GPIO.setmode(GPIO.BCM)

# PIN SETUP
GPIO.setup(2, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)  

def motion(channel): 
    sendEmail.sendEmail(); 
    print ("MOTION DETECTED")  

GPIO.add_event_detect(2, GPIO.FALLING, callback=motion)  
	
timestamp = time.strftime("%Y-%m-%d-%H-%M-%S")

jsonstr = open('user.json').read()
user = json.loads(jsonstr)

# sensors_data = [ {'id': id, 'type': 'Temperature', 'value':45}, {'id': id, 'type': 'Humidity', 'value':45}  ]
# jdata = {'custID':user['custID'], 'deviceID':user['deviceID'], 'data':sensors_data, 'time':Timestampo}
# urllib.request.urlopen(req)
	
try:  
    while(1):
        count=1;
  
except KeyboardInterrupt:  
    GPIO.cleanup()  # clean up GPIO on CTRL+C exit  
GPIO.cleanup()  # clean up GPIO on normal exit  	

