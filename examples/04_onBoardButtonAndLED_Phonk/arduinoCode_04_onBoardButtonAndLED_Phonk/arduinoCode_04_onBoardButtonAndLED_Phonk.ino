
/*
 * UltraTool | NodeMCU - Blynk - phonk pipeline workshop | Spring 2021
 * 
 * // this examples uses virtual Pins to push data thru blynk to the phonk app
 * // sending the value of the onBoard Button and receiving values for both onBoard LEDS 
 * 
 */


/*************************************************************
  Download latest Blynk library here:
    https://github.com/blynkkk/blynk-library/releases/latest

  Blynk is a platform with iOS and Android apps to control
  Arduino, Raspberry Pi and the likes over the Internet.
  You can easily build graphic interfaces for all your
  projects by simply dragging and dropping widgets.

    Downloads, docs, tutorials: http://www.blynk.cc
    Sketch generator:           http://examples.blynk.cc
    Blynk community:            http://community.blynk.cc
    Follow us:                  http://www.fb.com/blynkapp
                                http://twitter.com/blynk_app

  Blynk library is licensed under MIT license
  This example code is in public domain.

 *************************************************************
  This example runs directly on NodeMCU.

  Note: This requires ESP8266 support package:
    https://github.com/esp8266/Arduino

  Please be sure to select the right NodeMCU module
  in the Tools -> Board menu!

  For advanced settings please follow ESP examples :
   - ESP8266_Standalone_Manual_IP.ino
   - ESP8266_Standalone_SmartConfig.ino
   - ESP8266_Standalone_SSL.ino

  Change WiFi ssid, pass, and Blynk auth token to run :)
  Feel free to apply it to any other example. It's simple!
 *************************************************************

/* Comment this out to disable prints and save space */
#define BLYNK_PRINT Serial


#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>


// You should get Auth Token in the Blynk App.
// Go to the Project Settings (nut icon).
char auth[] = "trfO3fkTVVpTS2oVrJQyOdHG4pbu4FOG";

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "cirg";
char pass[] = "workshop";

BlynkTimer timer;

// This function sends Arduino's up time every second to Virtual Pin (3).
// In the app, Widget's reading frequency should be set to PUSH. This means
// that you define how often to send data to Blynk App.
void myTimerEvent()
{
  // You can send any value at any time.
  // Please don't send more that 10 values per second.
  Blynk.virtualWrite(V3, digitalRead(D3));
}


BLYNK_WRITE(V1)
{
  analogWrite(D4,param.asInt());
}


BLYNK_WRITE(V2)
{
  analogWrite(D0,param.asInt()*1023);
}



void setup()
{
  // Debug console
  Serial.begin(9600);
  pinMode(D3, INPUT);

  //Blynk.begin(auth, ssid, pass);
  
  // You can also specify server:
  //Blynk.begin(auth, ssid, pass, "blynk-cloud.com", 80);
  //Blynk.begin(auth, ssid, pass, IPAddress(192,168,1,100), 8080);

  // Setup a function to be called every second
  //timer.setInterval(1000L, myTimerEvent);
  
  // Setup a function to be called twice every second
   timer.setInterval(500L, myTimerEvent);

}

void loop()
{
  Blynk.run();
  timer.run(); // Initiates BlynkTimer
}
