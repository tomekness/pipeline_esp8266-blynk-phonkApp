/*
 * UltraTool | NodeMCU - Blynk - phonk pipeline workshop | Spring 2021
 * 
 * Sending phone LightSensor and reseiving NodeMCU LighSensor 
 *
 * based on the Phonk Example: Accelerometer
 */


// set your blynk token here 
var blynkToken = "oHzUtjhw73mQuIL--E_FzUNqeRx09X3A";


ui.addTitle(app.name)

var text = ui.addText('y axis (value between -10 - 10)', 0.1, 0.1)
var plotY = ui.addPlot(0.1, 0.15, 0.8, 0.1).name('y').range(-10, 10)

var text = ui.addText('z and z axis (not send)', 0.1, 0.45)
var plotX = ui.addPlot(0.1, 0.50, 0.8, 0.1).name('x').range(-10, 10)
var plotZ = ui.addPlot(0.1, 0.65, 0.8, 0.1).name('z').range(-10, 10)

// create a global var to store the tilt
var tilt = 0; 

sensors.accelerometer.onChange(function (data) {
  plotX.update(data.x)
  plotY.update(data.y)
  plotZ.update(data.z)
  tilt = (data.y + 10) / 20 *180;
})


// this value is in milliseconds
var repeatingSpeed = 200

var loop = util.loop(repeatingSpeed, function () {
  
  var url = "http://blynk-cloud.com/" + blynkToken + "/update/v3?value=" + tilt;
  url = url.toString();   
  //console.log(data.x)
  network.httpRequest({
    method: 'GET',
    url: url
  }).onResponse(function (e) {
    console.log(e.status, e.response)
  });
  
})
 

// start / stop accelerometer
var text = ui.addText('Press this button to start sending data', 0.1, 0.8)

  ui.addToggle(['ON', 'OFF'], 0.1, 0.85, 0.8, 0.1).onChange(function (o) {
  if (o.checked) {
    sensors.accelerometer.start();
    loop.start();
  }
  else
  { 
    sensors.accelerometer.stop();
    loop.stop();
  }
})
