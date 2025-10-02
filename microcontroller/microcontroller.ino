#include <Wire.h> 
#include <LiquidCrystal_I2C.h> 
#include "DHT.h"

#define col  16 
#define lin   2 
#define ende  0x27 



#define DHTPIN 15     
#define DHTTYPE DHT22   
LiquidCrystal_I2C lcd(ende,16,2);
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  lcd.init(); 
  lcd.clear(); 
  lcd.backlight(); 
  dht.begin();


}

void loop() {

  
  delay(500);
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  
  if (isnan(h) || isnan(t) || isnan(f)) {
    lcd.clear();
  lcd.setCursor(0, 0); 
    lcd.print(" ERROR! ");
    return;
  }

  lcd.setCursor(0, 0); 
  lcd.print("HUM: ");
  lcd.print(h); 
  lcd.print("%");  //Exibe a mensagem na segunda linha do display
  lcd.setCursor(0, 1); //Coloca o cursor do display na coluna 1 e linha 2
  lcd.print("TEMP: ");  //Exibe a mensagem na segunda linha do display
  lcd.print(t);
  lcd.print((char)223); 
  lcd.print("C");  //Exibe a mensagem na segunda linha do display
}
