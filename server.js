const http = require("http");
const { backup, DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync("pokedata.db");

async function fetchDatabase() {
    const query = db.prepare("SELECT * FROM data ORDER BY key");
    return query.all(); // Returns a Promise 
}

// TODO: Implement substitution of database in use to backed up one
async function backupDatabase() {
    const date = new Date().toJSON();
    const totalPagesTransferred = await backup(db, `./backups/${date}-backup.db`, {
        rate: 1, // Copy one page at a time.
        progress: ({ totalPages, remainingPages }) => {
            console.log("[LOG] Backup in progress", { totalPages, remainingPages });
        },
    });
}

async function insertToDatabase(pokemon) {
    const insert = db.prepare("INSERT INTO data (key, name, type, color) VALUES (?, ?, ?, ?)");
    insert.run(pokemon.id, pokemon.name, pokemon.type, pokemon.color);
}

const PORT = 8080;
const ADDR = "127.0.0.1";

const server = http.createServer((req, res) => {
    const headers = {
        "Access-Control-Allow-Origin": "*", // Security issues involving this
        "Content-Type": "application/json",
    };
    const url = new URL("http://" + ADDR + ":" + PORT + req.url);
    
    if (url.pathname == "/") {
        res.writeHead(200, headers);
        res.end(JSON.stringify({
            message: "This is home /.",
        }));
    } else if (url.pathname == "/backup") {
        backupDatabase();
        res.end(JSON.stringify({
            message: "Backup completed"
        }));
    } else if (url.pathname == "/all") {
        fetchDatabase().then(pokemons => {
            res.writeHead(200, headers);
            res.end(JSON.stringify(pokemons));
        });
    // DEBUG FEATURE
    } else if (url.pathname == "/close") {
        res.writeHead(200, headers);
        res.end(JSON.stringify({
            message: "Server closed"
        }));
        server.close();
    } else if (url.pathname == "/search") {
        res.writeHead(200, headers);
        res.end(JSON.stringify({
            message: "Not implemented"
        }));
        // switch(url.search.substring(1)) {
        // }
    } else {
        res.writeHead(200, headers)
        res.end(JSON.stringify({
            message: "Not sure why you're here.",
        }));
    }
});

server.on("close", (err) => {
    console.log("[LOG] Server closed")
    db.close();
})

server.listen(PORT, ADDR, (e) => {
    console.log("Listening to port", PORT);
});
