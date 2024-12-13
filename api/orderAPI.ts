import axios from "axios";
import { SuperQueries } from "./SuperQueries";
import { Order } from "../entities/Order";

export class OrderAPI extends SuperQueries {
  static orderUrl = super.baseUrl + "order/";


  static async createOrder(order:Order) {
    try {
      const response = await axios.post(this.orderUrl, order);
      return response.data;
    } catch (error) {
      console.log("error fetching merchant", error);
      throw error;
    }
  }
}