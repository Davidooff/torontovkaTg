import IAd from "../../types/ad.js";
import fetchTorontovka from "./torontovka/main.js";

export default async function getAll(dateAfter?: number) {
  let data = await fetchTorontovka();
  if (dateAfter) {
    data = data.filter((el) => el.updated - dateAfter > 0);
  }
  return data;
}
