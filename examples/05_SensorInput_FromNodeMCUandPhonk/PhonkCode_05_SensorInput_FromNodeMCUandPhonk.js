/*
 * UltraTool | NodeMCU - Blynk - phonk pipeline workshop | Spring 2021
 * 
 * Sending phone LightSensor and reseiving NodeMCU LighSensor 
 *
 * based on the Phonk Example: Light Sensor
 */


// set your blynk token here 
var blynkToken = "_JQQWV6cjq99WIsGbvySeLlHaXI73bkF";

ui.addTitle(app.name)

var phonePlot = ui.addPlot(0.1, 0.15, 0.8, 0.2).name('phone light Sensor').range(0, 180)
var NodeMCUplot = ui.addPlot(0.1, 0.40, 0.8, 0.2).name('phone light Sensor').range(0, 1023)

// create a var to store the intenstity globaly
var intensity = 0;

sensors.light.onChange(function (data) {
  phonePlot.update(data.intensity)
  intensity = data.intensity;
})



// create a loop to send your data to blynk just twice a second
var repeatingSpeed = 500

var loop = util.loop(repeatingSpeed, function () {
  
  var url = "http://tomekness.ddns.net:8080/" + blynkToken + "/update/v4?value=" + intensity;
  url = url.toString();   
  //console.log(data.x)
  network.httpRequest({
    method: 'GET',
    url: url
  }).onResponse(function (e) {
   // console.log(e.status, e.response) // just needed for debugging
  });
  
  var url = "http://tomekness.ddns.net:8080/" + blynkToken + "/get/v5";
  url = url.toString();   
  //console.log(data.x)
  network.httpRequest({
    method: 'GET',
    url: url
  }).onResponse(function (e) {
    //console.log(e.status, e.response) // just needed for debugging
    var NodeMCU_Intensity = JSON.parse(e.response);
    //console.log(NodeMCU_Intensity);
    NodeMCUplot.update(NodeMCU_Intensity)
  });
  
  
})
 


// start / stop light sensor
ui.addToggle(['ON', 'OFF'], 0.1, 0.9, 0.8, 0.1).onChange(function (o) {
  if (o.checked) {
    sensors.light.start()
    loop.start();
  }
  else { 
    sensors.light.stop()
    loop.stop();
  }
})
