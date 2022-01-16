import axios from "axios";
import cheerio from "cheerio";
import Item from "../interfaces/Item";

let getData = (html: any) => {
  let data: Array<Item> = [];
  const $ = cheerio.load(html);

  $("tr").each((index: number, element: cheerio.Element) => {
    let code = $((element as cheerio.TagElement).firstChild).text();
    let name = $((element as cheerio.TagElement).lastChild)
      .text()
      .split("\n")[0];
    let steps = $((element as cheerio.TagElement).lastChild)
      .text()
      .split("\n")[1];

    let item: Item = {
      index,
      code,
      name,
      steps,
    };
    data.push(item);
  });

  return data;
};

export const requestData = async (url: string) => {
  return axios
    .get(url)
    .then((response) => {
      return getData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
