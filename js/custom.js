var clientId = "ws" + Math.random();

//Get the details from CloudMQTT CloudMQTT Console *** https://api.cloudmqtt.com/sso/cloudmqtt/console **** 
var server_name = "..........";
var username = "..........";
var password = ".........."

client = new Paho.MQTT.Client(server_name, 33670,clientId); 
 
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

var options = {
	useSSL: true,
	userName: username,
	password: password,
	onSuccess:onConnect,
	onFailure:doFail
}

// connect the client
client.connect(options);

// called when the client connects
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	//console.log("onConnect");
	//client.subscribe("/cloudmqtt");
	//message = new Paho.MQTT.Message("Hello CloudMQTT");
	//message.destinationName = "/cloudmqtt";
	//client.send(message); 
}

function doFail(e){
	console.log(e);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
	  console.log("onConnectionLost:"+responseObject.errorMessage);
	}
}

// called when a message arrives
function onMessageArrived(message) {
	console.log("onMessageArrived:"+message.payloadString);
}

  
    
////////////////////////////////////////////

$(function() {
    $('.row-div').on('change','.things',function() {
	
      statusVal = $(this).prop('checked');
	 
	   message = new Paho.MQTT.Message($(this).data("no")+","+statusVal);
		message.destinationName = "/cloudmqtt";
		client.send(message); 
    })
	
})