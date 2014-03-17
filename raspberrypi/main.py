import urllib.parse
import urllib.request
import time
import json
#import RPi.GPIO as GPIO  
#GPIO.setmode(GPIO.BCM)

#PIN SETUP
#GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)  

#GPIO.add_event_detect(23, GPIO.RISING, callback=motion)  

def motion(channel):  
    print "MOTION DETECTED"  

	
timestamp = time.strftime("%Y-%m-%d-%H-%M-%S")

jsonstr = open('user.json').read()
users = json.loads(jsonstr)



while(true):
    jdata= {"email":email,"sensor":sensor,"value":temp,"date":timestamp,"device":device}
    data = urllib.parse.urlencode(jdata)
    binary_data = data.encode('ascii')
    req =urllib.request.Request("http://www.homesense.abovotec.com/api.php/sensor/put_data/?", binary_data)
    urllib.request.urlopen(req)
    i+=1
    time.sleep(25) # delays for 3 seconds
	
	

