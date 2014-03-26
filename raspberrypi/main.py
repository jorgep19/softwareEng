import requests
import time
import json
import RPi.GPIO as GPIO  
import smtplib

GPIO.setmode(GPIO.BCM)

def getTemperature():
	tfile = open("/sys/bus/w1/devices/28-000005947dc5/w1_slave")
	text = tfile.read()
	tfile.close()
	temperature_data = text.split()[-1]
	temperature = float(temperature_data[2:])
	temperature = temperature / 1000 *9.0 /5.0 +32
	return temperature

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
    
# PIN SETUP
GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) 
GPIO.add_event_detect(17, GPIO.FALLING, callback=motion)  
	
timestamp = time.strftime("%Y-%m-%d-%H-%M-%S")
#jsonstr = open('user.json').read()
#user = json.loads(jsonstr)


url = "http://10.136.46.30:8080/api/pi/put/data"

print(response)
try:  
    while(1):
        sensors_data = [ {'sensID': '13', 'type': '1', 'sdataValue':getTemperature()} ]
        headers= {'content-type':'application/json'}
        sent_data = {'cusID':2019, 'sensors':sensors_data }
        response = requests.post(url, data=json.dumps(sent_data),headers=headers)
        wait(2)
  
except KeyboardInterrupt:  
    GPIO.cleanup()  # clean up GPIO on CTRL+C exit  
GPIO.cleanup()  # clean up GPIO on normal exit  	


