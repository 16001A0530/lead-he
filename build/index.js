"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_cache_1 = __importDefault(require("node-cache"));
const scrap_1 = require("./controllers/scrap");
const PORT = process.env.PORT || 8000;
const URL = "https://www.chessgames.com/chessecohelp.html";
const app = (0, express_1.default)();
const cache = new node_cache_1.default();
app.use(express_1.default.json());
app.set("view engine", "jade");
app.set("views", "./views");
//TODO: Add all ECO code in DB
//TODO: Bot
app.get("/", (req, res, next) => {
    (0, scrap_1.requestData)(URL)
        .then((data) => {
        if (data === undefined) {
            res.send('<h3 color="red">Error Occurred <br/> Sorry for inconvenience</h3>');
        }
        else {
            // res.render("home", { data });
            let string = "<thead><th>Index</th><th>Code</th><th>Name</th><th>Steps</th></thead><tbody>";
            data.forEach((item) => {
                string +=
                    "<tr><td>" +
                        item.index +
                        "</td><td>" +
                        item.code +
                        "</td><td>" +
                        item.name +
                        "</td><td>" +
                        item.steps +
                        "</td>";
            });
            res.send("<table border=3>" + string + "</tbody></table>");
        }
    })
        .catch((error) => {
        res.send('<h3 color="red">Error Occurred <br/> Sorry for inconvenience</h3> <br/>' +
            error);
    });
});
app.get("/:code", (req, res, next) => {
    let code = req.params.code;
    const uniqueKey = "Key=" + code;
    (0, scrap_1.requestData)(URL)
        .then((data) => {
        if (data === undefined) {
            res.send('<h3 color="red">Error Occurred <br/> Sorry for inconvenience</h3>');
        }
        else {
            data.forEach((item) => {
                if (item.code == code) {
                    let info = cache.get(uniqueKey);
                    if (info === undefined) {
                        cache.set(uniqueKey, item, 180);
                        res.send(`<h2>${item.name}</h2><p>${item.steps}</p>`);
                    }
                    else {
                        res.send(`<h2>${info.name}</h2><p>${info.steps}</p>`);
                    }
                }
            });
        }
    })
        .catch((error) => {
        res.send('<h3 color="red">Error Occurred <br/> Sorry for inconvenience</h3> <br/>' +
            error);
    });
});
//Server
app.listen(PORT, () => {
    console.log("Server is online now...");
});
