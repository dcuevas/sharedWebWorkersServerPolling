importScripts('ajax.js');

var isPollingActive = false;
var portsSubscribed = [];

self.addEventListener("connect", function(e) {
    var port = e.ports[0];
    portsSubscribed.push(port);

    function notifySubscribers(dataMessage) {
        portsSubscribed.forEach(function (subscriptorPort) {
            console.log('Notifiying to subscribers: ' + subscriptorPort);
            subscriptorPort.postMessage(dataMessage);
        });
    };

    function callBackend() {
        ajax("http://localhost:3000/resources/data/Messages.json", function(data, status){
            notifySubscribers(data);
        });
    };

    function activePollingIfNeeded() {
        if (!isPollingActive) {
            isPollingActive = true;
            setInterval(callBackend, 1000);
        } else {
            port.postMessage('Already polling');
        }
    };

    activePollingIfNeeded();

    port.start();

    port.addEventListener("message", function(e) {
        var currentPort = this;
        var data = e.data;

        switch (data.command) {
            case 'closing':
                console.log('Closing port');
                portsSubscribed.splice(portsSubscribed.indexOf(currentPort), 1);
                break;
        }
    }, false);

}, false);
