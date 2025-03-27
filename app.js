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

// TODO: Figure out a better way to handle pokemon data
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    let opts = req.url.substring(1).split("?");
    
    if (opts[0] == "pokemon") {
        switch(opts[1]) {
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
            message: "Hi there.",
            code: 200
        }));
    }
});

server.listen(PORT, ADDR, () => {
    console.log("Listening to port", PORT);
});
