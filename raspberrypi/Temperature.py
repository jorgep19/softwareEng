import urllib.parse
import urllib.request
import time
import json
import random


timestamp = time.strftime("%Y-%m-%d-%H-%M-%S")

tfile = open("/sys/bus/w1/devices/10-000802824e58/w1_slave")
text = tfile.read()
tfile.close()
temperature_data = text.split()[-1]
temperature = float(temperature_data[2:])
temperature = temperature / 1000

i=0
while(i<20):
    jdata= {"email":"indera@gmail.com","sensor":"TempSens1","value":temp,"date":timestamp,"device":"RasPi_Garage"}
    data = urllib.parse.urlencode(jdata)
    binary_data = data.encode('ascii')
    req =urllib.request.Request("http://www.homesense.abovotec.com/api/sensor/put_data/?", binary_data)
    urllib.request.urlopen(req)
    i+=1
    time.sleep(3) # delays for 5 seconds
