#include <TimeLib.h>
#include <ArduinoJson.h>
#include <ArduinoJson.hpp>
#include <HTTPClient.h>
#include <WiFi.h>
#include <WiFiUdp.h>


const char* ssid     = "<wifi name>";
const char* password = "<password>";
WiFiUDP ntpUDP;
const char* ntpServer = "pool.ntp.org";

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

   // Initialize time
  configTime(0, 0, ntpServer);
  while (!time(nullptr)) {
    Serial.println("Waiting for time sync...");
    delay(1000);
  }
  Serial.println("Time synchronized");

  delay(2000);

  delay(2000);
}

void loop() {
  // Generate random number between 1 and 20
  float randomTemperature = random(1, 21);
  Serial.println("random "+ String(randomTemperature));

  // Get current timestamp
  String timestamp = getTimeStamp();
  Serial.println("timestamp "+ timestamp);

  // Create JSON payload
  DynamicJsonDocument jsonPayload(128); // Adjust the size as needed
  jsonPayload["temp"] = randomTemperature;
  jsonPayload["timestamp"] = timestamp;

  // Serialize JSON payload
  String payloadString;
  serializeJson(jsonPayload, payloadString);
  Serial.println("payloadString "+ payloadString);
  

  // Send temperature data to server
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    // Your server address
    http.begin("http://<ip address>:<port>/temperature");

    // Set content type
    http.addHeader("Content-Type", "application/json");

    // Send POST request with JSON payload
    int httpResponseCode = http.POST(payloadString);
    Serial.println("httpResponseCode "+ String(httpResponseCode));

    // Check for errors
    if (httpResponseCode > 0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }

    // Free resources
    http.end();
  }else {
    Serial.println("WiFi not connected");
  }

  // Wait for 3 seconds before sending next reading
  delay(3000);
}

String getTimeStamp() {
  // Get current time in ISO 8601 format
  time_t now = time(nullptr);
  struct tm *timeinfo;
  char buffer[30];
  timeinfo = localtime(&now); // Use localtime instead of gmtime for local time
  strftime(buffer, sizeof(buffer), "%Y-%m-%dT%H:%M:%SZ", timeinfo);
  return String(buffer);
}
