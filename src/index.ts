import express from "express";
import NodeCache from "node-cache";
import { requestData } from "./controllers/scrap";
import Item from "./interfaces/Item";

const PORT = process.env.PORT || 8000;
const URL = "https://www.chessgames.com/chessecohelp.html";

const app: express.Express = express();
const cache = new NodeCache();

app.use(express.json());
app.set("view engine", "jade");
app.set("views", "./views");

//TODO: Add all ECO code in DB
//TODO: Bot

app.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    requestData(URL)
      .then((data: void | Array<Item>) => {
        if (data === undefined) {
          res.send(
            '<h3 color="red">Error Occurred <br/> Sorry for inconvenience</h3>'
          );
        } else {
          // res.render("home", { data });
          let string =
            "<thead><th>Index</th><th>Code</th><th>Name</th><th>Steps</th></thead><tbody>";

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
        res.send(
          '<h3 color="red">Error Occurred <br/> Sorry for inconvenience</h3> <br/>' +
            error
        );
      });
  }
);

app.get(
  "/:code",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let code = req.params.code;
    const uniqueKey: NodeCache.Key = "Key=" + code;

    requestData(URL)
      .then((data: void | Array<Item>) => {
        if (data === undefined) {
          res.send(
            '<h3 color="red">Error Occurred <br/> Sorry for inconvenience</h3>'
          );
        } else {
          data.forEach((item) => {
            if (item.code == code) {
              let info: undefined | Item = cache.get(uniqueKey);
              if (info === undefined) {
                cache.set(uniqueKey, item, 180);
                res.send(`<h2>${item.name}</h2><p>${item.steps}</p>`);
              } else {
                res.send(`<h2>${info.name}</h2><p>${info.steps}</p>`);
              }
            }
          });
        }
      })
      .catch((error) => {
        res.send(
          '<h3 color="red">Error Occurred <br/> Sorry for inconvenience</h3> <br/>' +
            error
        );
      });
  }
);

//Server
app.listen(PORT, () => {
  console.log("Server is online now...");
});
