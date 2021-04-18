
# pipline demo --> ESP8266-bynk-phonk.app
A simple way for prototyping physical interaciotns with prototyping boards ([NodeMCU (ESP8266](https://en.wikipedia.org/wiki/NodeMCU))) and mobile phones (android phones running [phonk.app](https://phonk.app/) ). 

![NodeMCU/blynk/phonk.app](https://raw.githubusercontent.com/tomekness/pipeline_esp8266-blynk-phonkApp/master/images/allApps.jpg)


This Repository contains an Basic introduction on how to use [NodeMCUs (ESP8266)](https://en.wikipedia.org/wiki/NodeMCU) (programmed using the Arduino IDE) and connecting them to the IOT plattform [blynk.io](https://blynk.io). And further more on how to use webhooks in blynk to enable an interacitons between the ESP8266 and [phonk.app]( https://phonk.app/) running on an Android phone.

Addtionally you will find collection of simple examples to get stated.

This Repo is part of a workshop for the [UltraTool](https://kh-berlin.de/lehrangebote/show/ultratool-1316.html) - Project by the weißensee kunsthochschule Berlin (schon of art and design) and the Imperial Collage.


## preparation

* download blynk app from https://blynk.io to an mobile phone, open the app and create an account. 
* download the phonk.app to your android deivce https://phonk.app/
* Download the Arduino IDE https://www.arduino.cc/en/software 
* Add »ESP8266 core« Hardware-Library to Arduino ( find an HowTo here: https://lastminuteengineers.com/esp8266-nodemcu-arduino-tutorial/ or https://create.arduino.cc/projecthub/electropeak/getting-started-w-nodemcu-esp8266-on-arduino-ide-28184f or https://www.instructables.com/Steps-to-Setup-Arduino-IDE-for-NODEMCU-ESP8266-WiF/ )
* You might need to install the drive for the NodeMCU, as well: https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers


## NodeMCU (ESP8266) Pin-Out

![NodeMCU PinOut](https://lastminuteengineers.com/wp-content/uploads/arduino/ESP-12E-Development-Board-ESP8266-NodeMCU-Pinout.png)
