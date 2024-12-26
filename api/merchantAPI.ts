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


  static async getAdminMerchant(token:string) {
    console.log("user api 40", token)
    try {
      const response = await axios.get(super.baseUrl + "auth/adminProfile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.log("error login",super.baseUrl, error);
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

  static async fetchOrder(id:number) {
    try {
      console.log("fetch order api")
      const response = await axios.get(super.baseUrl + "order/" + id);
      return response.data;
    } catch (error) {
      console.log("error fetching order", error);
      throw error;
    }
  }


  static async changeOrderStatus(id:number, status:string) {
    try {
      console.log("changeOrderStatus", id, status)
      const response = await axios.patch(super.baseUrl + "order/status/" + id, {status});
      return response.data;
    } catch (error) {
      console.log("error fetching merchant", error);
      throw error;
    }
  }


}