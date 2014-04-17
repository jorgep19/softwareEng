import json
import picamera
import smtplib
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart



def sendEmail():
    jsonstr = open('user.json').read()
    user = json.loads(jsonstr)
    carriers=['@messaging.sprintpcs.com',
		'@vtext.com',
		'@tmomail.net',
		'@txt.att.net',
		'@mymetropcs.com'
    ]
    recipients=[]
    for carrier in carriers:
        recipients.append(user['userPhoneNumber']+carrier)
    
    recipients.append(user['userEmail'])
    print(recipients)
    SUBJECT = 'Intrusion Detection'
    TEXT = 'Motion has been activated.'

    # Gmail Sign In
    gmail_sender = 'HomesenseTechnology@gmail.com'
    gmail_passwd = 'HomesenseTechnology1'

    msg= MIMEMultipart()
    msg['Subject']='Invasion'
    msg['TO'] = ", ".join(recipients)
    msg['FROM']=gmail_sender

    camera=picamera.PiCamera()
    camera.capture('image.jpg', quality=5)

    fp=open('image.jpg','rb')
    
    img=MIMEImage(fp.read())
    fp.close()
    msg.attach(img)


    
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.login(gmail_sender, gmail_passwd)
    
 
 
    try:
        server.send_message(msg)
        print ('email sent')
    except:
        print ('error sending mail')
    server.quit()

sendEmail()
