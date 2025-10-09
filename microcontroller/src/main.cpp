#include <Arduino.h>

#define ENABLE_USER_AUTH
#define ENABLE_DATABASE

#include <Wire.h> 
#include <LiquidCrystal_I2C.h> 
#include "DHT.h"
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <FirebaseClient.h>

#define WIFI_SSID "Samsung M54"
#define WIFI_PASSWORD "SantidadeAoSenhor123"


#define Web_API_KEY "AIzaSyA243Ru2idMnJ8jcv5C8q5AIbX1AtLTIto"
#define DATABASE_URL "https://thermif-default-rtdb.firebaseio.com/"
#define USER_EMAIL "teste123@gmail.com"
#define USER_PASS "teste123"

#define col  16 
#define lin  2 
#define ende 0x27 

void processData(AsyncResult &aResult);
void lcdPrintInfo(float humidity, float temperature);

// Authentication
UserAuth user_auth(Web_API_KEY, USER_EMAIL, USER_PASS);

// Firebase components
FirebaseApp app;
WiFiClientSecure ssl_client;
using AsyncClient = AsyncClientClass;
AsyncClient aClient(ssl_client);
RealtimeDatabase Database;

// Timer variables for sending data every 10 seconds
unsigned long lastSendTime = 0;
const unsigned long sendInterval = 10000; // 10 seconds in milliseconds

// Variables to send to the database
#define DHTPIN 15     
#define DHTTYPE DHT11
LiquidCrystal_I2C lcd(ende,16,2);
DHT dht(DHTPIN, DHTTYPE);



void setup(){
  
  Serial.begin(9600);

  // Connect to Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  
  // Configure SSL client
  ssl_client.setInsecure();
  ssl_client.setTimeout(1000);
  ssl_client.setHandshakeTimeout(5);
  
  // Initialize Firebase
  initializeApp(aClient, app, getAuth(user_auth), processData, "🔐 authTask");
  app.getApp<RealtimeDatabase>(Database);
  Database.url(DATABASE_URL);
  
}

void loop() {
  delay(500);
  lcd.init(); 
  lcd.clear(); 
  lcd.backlight(); 
  dht.begin();
  app.loop();
  if (app.ready()){ 
    unsigned long currentTime = millis();
    if (currentTime - lastSendTime >= sendInterval){
      lastSendTime = currentTime;     
      float humidity = dht.readHumidity();
      float temperature = dht.readTemperature();
      lcdPrintInfo(humidity, temperature);
      Database.set<float>(aClient, "/currentSensorData/humidity", humidity, processData, "RTDB_Send_Float");
      Database.set<float>(aClient, "/currentSensorData/temperature", temperature, processData, "RTDB_Send_Float");
    }
  }
 
}
void processData(AsyncResult &aResult) {
  if (!aResult.isResult())
    return;

  if (aResult.isEvent())
    Firebase.printf("Event task: %s, msg: %s, code: %d\n", aResult.uid().c_str(), aResult.eventLog().message().c_str(), aResult.eventLog().code());

  if (aResult.isDebug())
    Firebase.printf("Debug task: %s, msg: %s\n", aResult.uid().c_str(), aResult.debug().c_str());

  if (aResult.isError())
    Firebase.printf("Error task: %s, msg: %s, code: %d\n", aResult.uid().c_str(), aResult.error().message().c_str(), aResult.error().code());

  if (aResult.available())
    Firebase.printf("task: %s, payload: %s\n", aResult.uid().c_str(), aResult.c_str());
}

void lcdPrintInfo(float humidity, float temperature ) {
  if (isnan(humidity) || isnan(temperature)) {
    lcd.clear();
    lcd.setCursor(0, 0); 
    lcd.print(" ERROR! ");
    return;
  }

  lcd.setCursor(0, 0); 
  lcd.print("HUM: ");
  lcd.print(humidity); 
  lcd.print("%");  
  lcd.setCursor(0, 1); 
  lcd.print("TEMP: ");  
  lcd.print(temperature);
  lcd.print((char)223); 
  lcd.print("C"); 
}