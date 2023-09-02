import { HeadersInit } from "node-fetch";

export default interface IReqOptions {
  method: "GET" | "POST";
  body?: object;
  headers?: HeadersInit;
}
