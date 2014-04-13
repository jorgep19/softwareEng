import json
import requests


def updateSensors():
        url = "http://homesense.herokuapp.com/api/pi/update"
        jsonstr = open('user.json').read()
        users = json.loads(jsonstr)
        jdata = {'piId':users['piId'], 'userId':users['userId']}
        print(json.dumps(users))
        
        sensor_data = requests.post(url, data=jdata)
        sensor_json= sensor_data.json();
        print(sensor_data.text)
        f = open('sensors.json', 'w')
        f.write(json.dumps(sensor_json["sensors"]))
        f.close()

updateSensors() 
