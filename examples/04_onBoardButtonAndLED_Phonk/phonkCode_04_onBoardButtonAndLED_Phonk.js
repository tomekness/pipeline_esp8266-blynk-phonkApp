/*
 * UltraTool | NodeMCU - Blynk - phonk pipeline workshop | Spring 2021
 * 
 * Controlling NodeMCU onboard LEDs and reseiving NodeMCU onBoard Button state  
 *
 * based on the Phonk Examples
 */


// set your blynk token here 
var blynkToken = "S5BOqC6DDzAdSqnyZtl-TMJb722C537o";

ui.addTitle(app.name)


// create a var to store the intenstity globaly
var led1 = 0;
var led2 = 0;


var text = ui.addText('LED D4', 0.05, 0.45)
var slider = ui.addSlider(0.05, 0.5, 0.6, 0.1).range(800, 1023)

slider.onChange(function (o) {
  console.log(o.value)
  led1 = o.value;
  
})
slider.value(999)

var text = ui.addText('LED D0', 0.7, 0.45)
var toggle = ui.addToggle(['ON', 'OFF'], 0.7, 0.5, 0.2, 0.1)


toggle.onChange(function (o) {
  console.log(o.checked)
  if (o.checked == true){
    led2 = 1; 
  } 
  else {
    led2 = 0;
  }
})

var text = ui.addText('NodeMCU onBoard Button State', 0.1, 0.1)
var buttonPlot = ui.addPlot(0.1, 0.15, 0.8, 0.2).range(0, 1)



// create a loop to send your data to blynk just twice a second
var repeatingSpeed = 500

var loop = util.loop(repeatingSpeed, function () {
  
  // send value for  LED 1
  var url = "http://tomekness.ddns.net:8080/" + blynkToken + "/update/v1?value=" + led1;
  url = url.toString();   
  //console.log(data.x)
  network.httpRequest({
    method: 'GET',
    url: url
  }).onResponse(function (e) {
   // console.log(e.status, e.response) // just needed for debugging
  });
  
  // send value for  LED 2
  var url = "http://tomekness.ddns.net:8080/" + blynkToken + "/update/v2?value=" + led2;
  url = url.toString();   
  //console.log(data.x)
  network.httpRequest({
    method: 'GET',
    url: url
  }).onResponse(function (e) {
    console.log(e.status, e.response) // just needed for debugging
  });
  
  // receive buton state 
  var url = "http://tomekness.ddns.net:8080/" + blynkToken + "/get/v3";
  url = url.toString();   
  //console.log(data.x)
  network.httpRequest({
    method: 'GET',
    url: url
  }).onResponse(function (e) {
    //console.log(e.status, e.response) // just needed for debugging
    var button = JSON.parse(e.response);
    //console.log(NodeMCU_Intensity);
    buttonPlot.update(button)
  });
  
  
})
 

// start / stop APPLICATON 
ui.addToggle(['ON', 'OFF'], 0.1, 0.9, 0.8, 0.1).onChange(function (o) {
  if (o.checked) {
    loop.start();
  }
  else { 
    loop.stop();
  }
})
