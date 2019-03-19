// Notes from Noel:
// Build requires upload speed of 115200, and NodeMCU 0.9 board
// You also need to install the ZIP of FirebaseArdunio
// This also requires ArduinoJson library
//
// Copyright 2015 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

// FirebaseDemo_ESP8266 is a sample that demo the different functions
// of the FirebaseArduino API.

#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

// Set these to run example.
#define FIREBASE_HOST "physical-pacman-digital-maze.firebaseio.com"
#define FIREBASE_AUTH "AZGr9yR4HHVE4sYbfINmzs2r1EviHsAopM0SRIz3"
#define WIFI_SSID "BoardAndBrew"
#define WIFI_PASSWORD "stupidblowfish"

const int ledPin = 15;

void setup() {
  Serial.begin(9600);

  pinMode(ledPin,OUTPUT);

  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.setBool("light",false);
}

void loop() {

  bool light = Firebase.getBool("light");
  if (Firebase.failed()) {
    Serial.print("reading light failed: ");
    Serial.println(Firebase.error());
  }
  if (light) {
    digitalWrite(ledPin,HIGH);
  } else {
    digitalWrite(ledPin,LOW);
  }
}
