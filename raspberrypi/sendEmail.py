import picamera
import smtplib
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart



def sendEmail():
    TO = '7869706084@tmomail.net'        
    SUBJECT = 'Intrusion Detection'
    TEXT = 'Motion has been activated.'
    
    # Gmail Sign In
    gmail_sender = 'HomesenseTechnology@gmail.com'
    gmail_passwd = 'HomesenseTechnology1'

    msg= MIMEMultipart()
    msg['Subject']='Invasion'
    msg['TO']=TO
    msg['FROM']=gmail_sender

    camera=picamera.PiCamera()
    camera.capture('image.jpg', quality=10)

    fp=open('image.jpg','rb')
    
    img=MIMEImage(fp.read())
    fp.close()
    msg.attach(img)


    
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.login(gmail_sender, gmail_passwd)
    
    BODY = '\r\n'.join(['To: %s' % TO,
                        'From: %s' % gmail_sender,
                        'Subject: %s' % SUBJECT,
                        '', TEXT])
    try:
        server.send_message(msg)
        print ('email sent')
    except:
        print ('error sending mail')
    server.quit()

sendEmail()
