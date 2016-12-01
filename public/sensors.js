var client = new Paho.MQTT.Client("192.168.99.100", 8080, "Roger");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("value/#");
    var status = document.getElementById("status");
    status.setAttribute("class", "label label-success");
    status.innerHTML = "Connexion réussie !";
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);

        var status = document.getElementById("status");
        status.setAttribute("class", "label label-danger");
        status.innerHTML = "Connexion interrompue.";
    }
}

function formatOutput(results) {
    switch(results.type) {
        case "POSITIVE_NUMBER":
            return "Valeur : " + results.value;
            break;
        case "PERCENT":
            return "Valeur : " + (parseFloat(results.value) * 100).toFixed(2) + "%";
            break;
        case "ON_OFF":
            if(results.value == "ON")
                return "<span class=\"label label-success\">Allumé</span>"
            else
                return "<span class=\"label label-danger\">Eteint</span>"
    }
}

// called when a message arrives
function onMessageArrived(message) {
    console.log(message);
    var results = JSON.parse(message.payloadString);
    console.log(results);
    var sensorName = message._getDestinationName().split("/")[1];
    var container = document.getElementById(sensorName);
    if(container === null) {
        var sensorList = document.getElementById("sensor-list");
        var colMd = document.createElement("div");
        colMd.setAttribute("class", "col-md-4");
        colMd.setAttribute("id", sensorName);

        var panel = document.createElement("div");
        panel.setAttribute("class", "panel panel-info");

        var panelTitle = document.createElement("div");
        panelTitle.setAttribute("class", "panel-heading");
        panelTitle.innerHTML = "<h3 class=\"panel-title\">" + sensorName + "</h3>";

        panel.appendChild(panelTitle);

        var panelBody = document.createElement("div");
        panelBody.setAttribute("class", "panel-body sensor-value");

        panel.appendChild(panelBody);

        colMd.appendChild(panel);

        sensorList.appendChild(colMd);

        container = colMd;
    }
    var pBody = container.getElementsByClassName("sensor-value")[0];

    pBody.innerHTML = formatOutput(results);
}