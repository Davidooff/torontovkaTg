import MongoDB from "../mongo/main.js";
import getAll from "./urlsLogic/getAll.js";

export default async () => {
  getAndUpdateTheDate();
  setInterval(async () => getAndUpdateTheDate, 1000 * 60 * 5);
};

export async function getAndUpdateTheDate() {
  console.log("get parsed");

  const date = await getAll();
  await MongoDB.update(date);
  return date;
}
