## About
Simple Pokedex REST api written in pure Javascript.

## Quick Start
Start server (it's hardcoded on localhost for now)
```console
$ node ./app.js
$ Listening to port 8080...
```
And then send requests
```console
$ curl 127.0.0.1:8080/
{"message":"This is home /","code":200}
```

## Entry Points
```console
.../all
.../search?bulbasaur
.../search?pikachu
```
