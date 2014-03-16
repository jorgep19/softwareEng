import urllib.parse
import urllib.request
import json

url= "http://www.homesense.abovotec.com/api.php/sensor/get_user/?"
input = input("Enter code from website: ");
url+=input

#data= urllib.request.urlopen(url)

f = open('user.txt', 'w')
f.write("aranlucas@gmail.com\n")
f.write("TempSens1\n")
f.write("RasPi_Garage\n")

#json.dump(user, f)
f.close()
