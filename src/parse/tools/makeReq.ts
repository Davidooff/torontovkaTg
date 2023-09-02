import IReqOptions from "../types/reqOptions";
import fetch from "node-fetch";

export default async function (
  URL: string,
  options: IReqOptions
): Promise<any> {
  const response = await fetch(URL, options);

  if (response.status !== 200) throw new Error();

  const data = await response.json();

  return data;
}
