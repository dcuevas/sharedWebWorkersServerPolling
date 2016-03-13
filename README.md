# sharedWebWorkersServerPolling
Example of ajax call polling using of shared web workers. Share web worker coordinate the unique infinite polling to server and send respond  message to each client.

## Installing
Run ```npm install``` to install required npm packages.

## Running
Run ```node server/app.js``` in order to start web server at [localhost:3000](http://localhost:3000).

## How it works?
You can open more than one tab and the shared web worker will orquestrate infinite loop call every second and send the respond message to each of the tabs sharing the web worker.

