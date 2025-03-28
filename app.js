const http = require("http");

const PORT = 8080;
const ADDR = "127.0.0.1";

PokemonData = [
    {
        name: "Bulbasaur",
        type: "Grass",
        color: "Green", 
    },
    {
        name: "Pikachu",
        type: "Electric",
        color: "Yellow", 
    }
];

// TODO: Figure out a better way to handle pokemon PokemonData
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});

    const url = new URL("http://" + ADDR + ":" + PORT + req.url);
    
    if (url.pathname == "/") {
        res.end(JSON.stringify({
            message: "This is home /.",
            code: 200
        }));
    } else if (url.pathname == "/all") {
        res.end(JSON.stringify(PokemonData));
    } else if (url.pathname == "/search") {
        switch(url.search.substring(1)) {
            case "bulbasaur":
                res.end(JSON.stringify(PokemonData[0]));
                break;
            case "pikachu":
                res.end(JSON.stringify(PokemonData[1]));
                break;
            default:
                res.end(JSON.stringify({
                    message: "Error 404 - Not found",
                    code: 404
                }));
        }
    } else {
        res.end(JSON.stringify({
            message: "Not sure why you're here.",
            code: 200
        }));
    }
});

server.listen(PORT, ADDR, () => {
    console.log("Listening to port", PORT);
});
