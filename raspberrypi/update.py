import json
import requests


def updateSensors():
        url = "http://homesense.herokuapp.com/api/pi/update"
        jsonstr = open('user.json').read()
        user = json.loads(jsonstr)
        jdata = {'piId':user['piId'], 'userId':user['userId']}
        print(json.dumps(user))
        
        sensor_data = requests.post(url, data=jdata)
        sensor_json= sensor_data.json();
        print(sensor_data.text)
        f = open('sensors.json', 'w')
        f.write(json.dumps(sensor_json["sensors"]))
        f.close()

updateSensors() 
