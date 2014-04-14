function SensorVM() {
    var self = this;
    self.name = ko.observable("");
    self.type = ko.observable("");

    self.getData = function() {
        return {
            sensorDesc: self.name(),
            sensorType: self.type().value
        }
    }
}

// function ErrorMessageVM(error){
    // var self = this;

    // self.message = ko.observable(error);
// }

function AddPiVM() {
    var self = this;

    self.name = ko.observable("");
    self.sensors = ko.observableArray([]);
    self.sensorTypes = [];
    self.hasErrors = ko.observableArray(false);
    self.errors = ko.observableArray([]);

    // init the sensorTypes using the sensor types supported by the back end
    var initSensorTypes = function (data) {
        for(var i = 0; i < data.length; i ++ ) {
            self.sensorTypes.push( { value: data[i].stypeid, desc: data[i].stypedesc  })
        }
    };

    $.ajax({
        url: 'http://localhost:5000/api/sensor/get/types',
        success: initSensorTypes
    });

    // Operations
    self.addSensor = function() {
        self.sensors.push(new SensorVM());
    };

    self.removeSensor = function(sensor) {
        self.sensors.remove(sensor)
    };

    self.getData = function() {
        var sensorsData = [];

        for(var i = 0; i < self.sensors().length; i++) {
            sensorsData.push( self.sensors()[i].getData());
        }

        return {
            sensorName: self.name(),
            sensors: sensorsData
        }
    }

    self.submitPi = function() {
        self.hasErrors(false);
        self.errors([]);

        if(!self.name()) {
            self.errors.push( { message: 'Your Pi needs a name' } );
            self.hasErrors(true);
        }

        for(var i = 0; i < self.sensors().length; i++) {
            if ( !self.sensors()[i].name()) {
                self.errors.push( { message: 'Some of your sensos don\'t have name' } );
                self.hasErrors(true);
                break;
            }
        }

        if( !self.hasErrors() ) {
            console.log(self.getData());
            alert(self.getData())
        } else {
            console.log(self.errors)
        }
    };
}

ko.applyBindings(new AddPiVM());