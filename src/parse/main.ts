import MongoDB from "../mongo/main.js";
import getAll from "./urlsLogic/getAll.js";

export default async () => {
  const mongodb = new MongoDB();
  await mongodb.connect();
  const date = await getAll();
  console.log(date.length);
  await mongodb.update(date);

  // console.log(await mongodb.getAfter(1, 2));
};
