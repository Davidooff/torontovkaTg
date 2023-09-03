import IAd from "../../types/ad.js";
import fetchTorontovka from "./torontovka/main.js";

function filterData(data: IAd[], dateAfter: number) {
  data = data.filter((el) => el.updated - dateAfter > 0);
  return data;
}

export default async function getAll(dateAfter?: number) {
  let data = await fetchTorontovka();
  if (dateAfter) {
    data = filterData(data, dateAfter);
  }
  data = data.map((el) => {
    return {
      ...el,
      description: el.description.replace(
        /\?invite_code=.[\S]*/gm,
        "?invite_code=6xdvtzca6yfw"
      ),
    };
  });
  return data.sort((a, b) => a.updated - b.updated);
}
