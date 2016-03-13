# Shared Web Workers Single Server Polling
Example of ajax call polling using of shared web workers. Share web worker coordinate the unique infinite polling to server and send respond  message to each client.

## Installing
Run ```npm install``` to install required npm packages.

## Running
Run ```node server/app.js``` in order to start web server at [localhost:3000](http://localhost:3000).

## How it works?
You can open more than one tab and the shared web worker will orquestrate infinite loop call every second and send the respond message to each of the tabs sharing the web worker.

## Debug
Shared web worker ```console.log``` executions are not displayed in the page console. In order to see worker console you have to go ```chrome://inspect/#workers``` and click on ```inspect```.