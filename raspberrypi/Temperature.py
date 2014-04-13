def getTemperature():
	tfile = open("/sys/bus/w1/devices/w1_bus_master1/10-000802824e58/w1_slave")
	text = tfile.read()
	tfile.close()
	temperature_data = text.split()[-1]
	temperature = float(temperature_data[2:])
	temperature = temperature / 1000 *9.0 /5.0 +32
	return temperature

print (getTemperature(), 'C')
