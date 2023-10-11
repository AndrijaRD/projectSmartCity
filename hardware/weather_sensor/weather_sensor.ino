#include <Connection.h>
#include <DHT.h>

using namespace Connection;

#define DHTPIN D4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// TEST VALUES
float temperature = 38.75;
float humidity = 13.2;

const String id = "WTHSEN_000001"

// API HOST URL
const String host = "http://192.168.0.103:4001";

void setup() {
  Serial.begin(115200);                         // START SERIAL COMMUNICATION
  WiFi::connect("dlink", "Mpupin2019"); // CONNECT TO WIFI
  dht.begin();                                  // START SENSOR OBJECT
}
void loop() {
  humidity = dht.readHumidity();                // READ HUMIDITY     [ %  ]
  temperature = dht.readTemperature();          // READ TEMPERATURE  [ °C ]
  if (isnan(temperature) || isnan(humidity))
    Serial.println("Failed to read from DHT sensor!");
  else
    sendData();                                   // SEND DATA TO API
  delay(1000);                               // 30min DELAY BETWEEN MESURMENTS
}

void sendData(){
  HttpClient client;                                        // HTTP CLIENT
  client.setHost(host);                                         // SET API HOST URL
  client.get("/sensor/weather/insert/" + id + "/" + String(temperature) + "/" + String(humidity)); // FETCH THE URL WITH MESURED DATA IN ENDPOINT
}