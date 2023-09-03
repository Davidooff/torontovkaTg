import path from "path";
import makeReq from "../../tools/makeReq.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import IAd from "../../../types/ad.js";
import moment from "moment";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const options = JSON.parse(
  readFileSync(path.join(__dirname, "/options.json"), "utf-8")
);

let trysCounter = 0;
export default async function torontovka(): Promise<IAd[]> {
  try {
    let data = await makeReq(
      "https://app.torontovka.com/api/classified/search",
      { ...options, body: JSON.stringify(options.body) }
    );
    if (!(data && data.items)) throw new Error();
    data = data.items;
    data = data.map((item) => {
      if (item.date && item.updated) {
        item.date = moment(item.date).toDate().getTime();
        item.updated = moment(item.updated).toDate().getTime();
      }
      return item;
    });

    return data;
  } catch (err) {
    if (trysCounter === 2) {
      trysCounter = 0;
      throw new Error(err);
    }
    trysCounter++;
    return torontovka();
  }
}
