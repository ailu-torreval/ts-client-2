import { ProductExtra, ProductOption } from "./Product";
import { User } from "./User";

export interface OrderProduct {
    id?: number | undefined;
    product_id: number;
    name: string;
    price: number;
    total_amount: number;
    note: string;
    extras_ids?: number[] | null;
    option_id?: number | null;
    extras?: ProductExtra[]
    option?: ProductOption;
}

export class Order {
  id: number | null;
  merchant_id: number | null;
  contact_method: number | null; // 0 = table service, 1 = bar pickup with push notification, 2 = bar pickup without app notification
  table_id: number | null;
  payment_method: number | null; // 0 = card, 1 = Mobilepay
  payment_ref: number | null;
  date: Date | null;
  total_amount: number | null;
  order_status: string | null; // 'pending', 'completed', 'cancelled' etc.
  user?: Partial<User> | null;
  user_id?: number | null;
  order_products: OrderProduct[] | null;

  constructor(
    id: number,
    merchant_id: number,
    contact_method: number,
    table_id: number,
    payment_method: number,
    payment_ref: number,
    date: Date,
    total_amount: number,
    order_status: string,
    order_products: OrderProduct[],
    user?: User,
    user_id?: number
  ) {
    this.id = id;
    this.merchant_id = merchant_id;
    this.contact_method = contact_method;
    this.table_id = table_id;
    this.payment_method = payment_method;
    this.payment_ref = payment_ref;
    this.date = date;
    this.total_amount = total_amount;
    this.order_status = order_status;
    this.user = user;
    this.order_products = order_products;
    this.user_id = user_id;
  }
}
