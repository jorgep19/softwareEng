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