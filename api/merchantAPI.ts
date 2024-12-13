import axios from "axios";
import { SuperQueries } from "./SuperQueries";

export class MerchantAPI extends SuperQueries {
  static merchantUrl = super.baseUrl + "merchant/";


  static async fetchMerchant(id:number) {
    try {
      const response = await axios.get(this.merchantUrl + id);
      return response.data;
    } catch (error) {
      console.log("error fetching merchant", error);
      throw error;
    }
  }
}