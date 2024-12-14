import axios from "axios";
import { SuperQueries } from "./SuperQueries";

export class MerchantAPI extends SuperQueries {
  // static merchantUrl = super.baseUrl + "merchant/";


  static async fetchMerchant(id:number) {
    try {
      const response = await axios.get(super.baseUrl + "merchant/" + id);
      return response.data;
    } catch (error) {
      console.log("error fetching merchant", error);
      throw error;
    }
  }


  static async fetchProduct(id:number) {
    try {
      const response = await axios.get(super.baseUrl + "product/" + id);
      return response.data;
    } catch (error) {
      console.log("error fetching merchant", error);
      throw error;
    }
  }


}