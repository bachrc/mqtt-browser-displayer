let client = mqtt.connect("mqtt://127.0.0.1:1883");

client.on('connect', () => {
    client.subscribe('value/#');
    console.log("CONNECTE");
});

client.on('message', (topic, message) => {
    console.log("salut");
    let toDisplay = document.createElement("li");
    let text = document.createTextNode(message);
    toDisplay.appendChild(text);
    document.getElementById("messages").appendChild(toDisplay);
});
