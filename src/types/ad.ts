import IAdData from "./adData";
import IPersonAd from "./personAd";

export default interface IAd extends IPersonAd, IAdData {
  id: number;
  date: number;
  updated: number;
}
