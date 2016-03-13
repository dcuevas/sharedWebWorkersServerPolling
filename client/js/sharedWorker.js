// This is the code for: 'sharedWorker1.js' file
// Shared workers that handle the connections and Welcome each new script
importScripts('ajax.js');

var counter = 0; // count active connections
var isPollingActive = false;
var portsSubscribed = [];

self.addEventListener("connect", function(e) {
    var port = e.ports[0];
    portsSubscribed.push(port);

    function notifySubscribers(dataMessage) {
        portsSubscribed.forEach(function (subscriptorPort) {
            console.log('Notifiying to subs: ' + subscriptorPort);
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
            // Tab closed, remove port
            case 'closing':
                console.log('Closing');
                portsSubscribed.splice(portsSubscribed.indexOf(currentPort), 1);
                break;
        }
    }, false);

}, false);
