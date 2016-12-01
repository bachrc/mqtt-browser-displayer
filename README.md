# MQTT Displayer

This app can easily display the data received from an MQTT server, by subscribing to `value/#`

## Launching the application

In the project directory, open a console and then type in :

```
npm install
npm start
```

And then you can access to the app via `localhost:1234` !

## Connect the application to the MQTT server

On the [sensors.js](/public/sensors.js) file, on the first line, you can change 
the MQTT server address and port. You can combine the random sensors generator available here : 
https://github.com/pigne/random-sensors

