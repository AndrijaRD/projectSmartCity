#include "sc.h"
#include <ESP8266HTTPClient.h>


/********** WIFI **********/
void sc::ESP_WiFi::connect(String SSID, String Password) {
    WiFi.mode(WIFI_OFF);
  	delay(1000);
  	WiFi.mode(WIFI_STA);
  	WiFi.begin(SSID, Password);
	Serial.println("\n[LOG][WIFI] Connecting...");
	while (WiFi.status() != WL_CONNECTED) { delay(100); }
	Serial.println("[LOG][WIFI] CONNECTED.");
	Serial.print("[LOG][WIFI] IP address: "); 
	Serial.println(WiFi.localIP());
}

/********** HTTPS **********/
void sc::HttpsClient::setHost(String host){
	this->host = host;
}

String sc::HttpsClient::get(String path) {
	if(this->host==""){
		Serial.println("[LOG][ERROR] You have to set host before fetching. Use .setHost();");
		return "Error";
	}
	Serial.print("[LOG][HTTPS] Fetching: "); Serial.println(this->host + path);
	WiFiClientSecure client;
	client.setInsecure();
	client.connect(this->host, this->Port);
	HTTPClient http;
	http.begin(client, this->host+path);
	String payload = "Error";
	if(http.GET() == HTTP_CODE_OK)
		payload = http.getString();	
	
	return payload;
}


/********** HTTP **********/

void sc::HttpClient::setHost(String host) {
    this->host = host;
}

void sc::HttpClient::setPort(int port) {
	this->Port = port;
}

String sc::HttpClient::get(String path) {
    if(this->host==""){
        Serial.println("[LOG][ERROR] You have to set host before fetching. Use .setHost();");
        return "Error";
    }
	Serial.print("[LOG][HTTP] Fetching: "); Serial.println(this->host + path);
    WiFiClient client;
    HTTPClient http;
    http.begin(client, this->host + path);

    String payload = "Error";
    if(http.GET() == HTTP_CODE_OK)
        payload = http.getString();    
    
    return payload;
}