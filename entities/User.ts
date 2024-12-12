import { Order } from "./Order";

export enum Role {
  User = "user",
  Merchant_admin = "merchant_admin",
}

export class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  notification_token: string;
  role: Role;
  phone_nr: string;
  orders: Order[];

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    notification_token: string,
    password: string,
    email: string,
    phone_nr: string,
    orders: Order[],
    role?: Role
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.notification_token = notification_token;
    this.password = password;
    this.email = email;
    this.phone_nr = phone_nr;
    this.role = role || Role.User;
    this.orders = orders;
  }
}
