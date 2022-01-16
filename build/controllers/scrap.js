"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestData = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
let getData = (html) => {
    let data = [];
    const $ = cheerio_1.default.load(html);
    $("tr").each((index, element) => {
        let code = $(element.firstChild).text();
        let name = $(element.lastChild)
            .text()
            .split("\n")[0];
        let steps = $(element.lastChild)
            .text()
            .split("\n")[1];
        let item = {
            index,
            code,
            name,
            steps,
        };
        data.push(item);
    });
    return data;
};
const requestData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    return axios_1.default
        .get(url)
        .then((response) => {
        return getData(response.data);
    })
        .catch((error) => {
        console.log(error);
    });
});
exports.requestData = requestData;
