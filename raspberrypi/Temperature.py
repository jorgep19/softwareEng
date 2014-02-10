# Copyright (c) 2012 Matthew Kirk
# Licensed under MIT License, see 
# http://www.cl.cam.ac.uk/freshers/raspberrypi/tutorials/temperature/LICENSE
# sudo apt-get install python-rpi.gpio
import time
import json

timestamp = time.strftime("%Y-%m-%d-%H-%M-%S")

tfile = open("/sys/bus/w1/devices/10-000802824e58/w1_slave")
text = tfile.read()
tfile.close()
temperature_data = text.split()[-1]
temperature = float(temperature_data[2:])
temperature = temperature / 1000

jdata= json.dumps({"4":{"raspsdID":"4","cusID":"1","raspsID":"1","cusEmail":"indera@gmail.com","raspsDescription":"TempSens1","raspsdValue":temperature,"raspsdDateAdded":timestamp}})

urllib2.urlopen("http://www.example.com/", jdata)

print jdata

print temperature