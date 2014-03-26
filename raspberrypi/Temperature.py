def getTemperature():
	tfile = open("/sys/bus/w1/devices/28000005947dc5/w1_slave")
	text = tfile.read()
	tfile.close()
	temperature_data = text.split()[-1]
	temperature = float(temperature_data[2:])
	temperature = temperature / 1000
	return temperature