import requests
import time
import json
import RPi.GPIO as GPIO  
import smtplib

GPIO.setmode(GPIO.BCM)

# PIN SETUP
GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)  \

def sendEmail():
    TO = '7864455132@messaging.sprintpcs.com'
        
    SUBJECT = 'Intrusion Detection'
    TEXT = 'Motion has been activated.'
    
    # Gmail Sign In
    gmail_sender = 'HomesenseTechnology@gmail.com'
    gmail_passwd = 'HomesenseTechnology1'
    
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.login(gmail_sender, gmail_passwd)
    
    BODY = '\r\n'.join(['To: %s' % TO,
                        'From: %s' % gmail_sender,
                        'Subject: %s' % SUBJECT,
                        '', TEXT])
    try:
        server.sendmail(gmail_sender, [TO], BODY)
        print ('email sent')
    except:
        print ('error sending mail')
    server.quit()
    
def motion(channel): 
    sendEmail(); 
    print ("MOTION DETECTED")  

GPIO.add_event_detect(17, GPIO.FALLING, callback=motion)  
	
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


