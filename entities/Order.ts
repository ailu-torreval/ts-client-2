import { ProductExtra, ProductOption } from "./Product";
import { User } from "./User";

export interface OrderProduct {
    id: number;
    product_id: number;
    name: string;
    price: number;
    total_amount: number;
    note: string;
    extras?: ProductExtra[]
    option?: ProductOption;
}

export class Order {
  id: number;
  merchant_id: number;
  contact_method: number; // 0 = table service, 1 = bar pickup with push notification, 2 = bar pickup without app notification
  table_code: number;
  payment_method: number; // 0 = card, 1 = Mobilepay
  payment_ref: number;
  date: Date;
  total_amount: number;
  order_status: string; // 'pending', 'completed', 'cancelled' etc.
  user?: Partial<User>;
  user_id?: number;
  products: OrderProduct[];

  constructor(
    id: number,
    merchant_id: number,
    contact_method: number,
    table_code: number,
    payment_method: number,
    payment_ref: number,
    date: Date,
    total_amount: number,
    order_status: string,
    products: OrderProduct[],
    user?: User,
    user_id?: number
  ) {
    this.id = id;
    this.merchant_id = merchant_id;
    this.contact_method = contact_method;
    this.table_code = table_code;
    this.payment_method = payment_method;
    this.payment_ref = payment_ref;
    this.date = date;
    this.total_amount = total_amount;
    this.order_status = order_status;
    this.user = user;
    this.products = products;
    this.user_id = user_id;
  }
}
