# ESP32 Code

This code is designed for an ESP32 microcontroller, typically used in IoT (Internet of Things) projects. The purpose of this code is to read a random temperature value, along with the current timestamp, and send this data to a server via HTTP POST requests in JSON format.

## Functionality

1. **WiFi Connection**: The code connects to a WiFi network using the provided SSID and password.

2. **Time Synchronization**: It synchronizes the device's time with an NTP (Network Time Protocol) server (in this case, `pool.ntp.org`) to ensure accurate timestamping of data.

3. **Main Loop**:
   - Generates a random temperature value between 1 and 20.
   - Retrieves the current timestamp.
   - Creates a JSON payload containing the temperature and timestamp.
   - Sends the JSON payload to a specified server address via HTTP POST request.
   - Handles errors and prints relevant messages.
   - Waits for 3 seconds before sending the next reading.

4. **getTimeStamp() Function**: Formats the current time into an ISO 8601 timestamp string (`YYYY-MM-DDTHH:MM:SSZ`).

## Libraries Used

- **TimeLib.h**: Library for time-related functions.
- **ArduinoJson.h**: Library for working with JSON data.
- **HTTPClient.h**: Library for making HTTP requests.
- **WiFi.h**: Library for connecting to WiFi networks.
- **WiFiUdp.h**: Library for UDP communication over WiFi.

## Configuration

- **WiFi Credentials**: Replace `ssid` and `password` with your WiFi network credentials.
- **Server Address**: Update the server address in `http.begin()` to match your server's address and port.
- **JSON Payload**: Adjust the size of `DynamicJsonDocument` according to your payload size requirements.

## Usage

1. Upload this code to an ESP32 microcontroller using the Arduino IDE or a similar development environment.
2. Ensure that the ESP32 is connected to the same WiFi network as the server.
3. Monitor the serial output to observe the temperature readings and HTTP response codes.
4. Receive temperature data on the specified server endpoint.

## Notes

- Ensure that the server specified in the code is running and capable of receiving HTTP POST requests.
- Adjust the delay time in the main loop (`loop()`) according to your desired frequency of temperature readings and data transmission.
- Additional error handling and security measures can be implemented based on specific project requirements and deployment environments.

# React Code

This React code creates a component called `DataDisplay` to fetch and display data points from a server. It utilizes Axios for making HTTP requests and updates the displayed data every 3 seconds.

## Functionality

1. **Data Fetching**: Fetches data from a server endpoint (`http://192.168.18.91:3005/data`) with a specified number of data points (`numPoints`).

2. **Data Display**: Displays fetched data points, including timestamps and temperatures, in a list format.

3. **Input Control**: Provides an input field to specify the number of data points to display.

4. **Automatic Refresh**: Automatically updates the displayed data every 3 seconds.

## Usage

1. Import the `DataDisplay` component into your React application.
2. Place the `DataDisplay` component in the desired part of your application.
3. The component will fetch and display data points from the specified server endpoint.
4. Users can input the number of data points they want to display using the input field.

## Component Structure

- **useState**: Manages state variables for `dataPoints` (array of fetched data) and `numPoints` (number of data points to display).

- **useEffect**: Executes code to fetch data and update the display. It runs on component mount and whenever `numPoints` changes.

- **fetchData Function**: Fetches data from the server using Axios and updates the state variable `dataPoints` accordingly.

- **interval**: Sets an interval to periodically fetch data every 3 seconds. It clears the interval on component unmount to avoid memory leaks.

- **handleInputChange Function**: Handles input changes in the number of data points field, updating `numPoints` accordingly.

## Notes

- Ensure that the server specified in the code is running and capable of responding to HTTP GET requests at the specified endpoint.
- Adjust the interval timing (`3000` milliseconds) according to your desired data refresh rate.
- Customize the display format of data points as needed based on the structure of your server response.
- Additional error handling and validation for user input can be implemented based on specific project requirements.

## Dependencies

- **React**: JavaScript library for building user interfaces.
- **axios**: Promise-based HTTP client for making AJAX requests.
- **useState**: React Hook for managing state in functional components.
- **useEffect**: React Hook for handling side effects in functional components.



# Express Server + MongoDB

This code sets up an Express server connected to a MongoDB database. It provides endpoints for saving and retrieving temperature data.

## Functionality

1. **Dependencies**: Utilizes Express, Mongoose (for MongoDB interaction), and CORS (Cross-Origin Resource Sharing) for handling HTTP requests.

2. **Server Setup**: Creates an Express application (`app`) and configures it to use JSON parsing and CORS.

3. **MongoDB Connection**: Connects to a MongoDB database named `sensordb` running locally on port `27017`.

4. **Endpoints**:
   - **GET '/'**: Responds with a message confirming the server's connection at `http://localhost:3005`.
   - **POST '/temperature'**: Accepts temperature data in JSON format (containing 'temp' and 'timestamp' fields) and saves it to the MongoDB collection named `temperatures`.
   - **GET '/data'**: Retrieves temperature data from the `temperatures` collection, sorted by timestamp in descending order, and limits the number of data points based on the `numPoints` query parameter.

5. **Error Handling**: Provides basic error handling for MongoDB connection errors and internal server errors during data saving and fetching.

## Usage

1. Ensure MongoDB is running locally on port `27017`.
2. Install dependencies using npm: `npm install`.
3. Start the server: `npm start`.
4. Access the server's endpoints as described above.

## Notes

- Adjust the MongoDB connection URI (`mongodb://localhost:27017/sensordb`) according to your MongoDB setup.
- Customize the endpoints and data models as needed for your application.
- Enhance error handling and validation based on specific project requirements.
- Ensure proper security measures are implemented before deploying the server to production.

## Dependencies

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing in Express.

## Installation

install dependencies after going client and server directory seperately and run following command

```bash
npm install 
