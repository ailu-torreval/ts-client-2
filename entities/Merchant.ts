import { MenuCat } from "./MenuCat";
import { Product } from "./Product";

export interface MerchantTable {
    id: number;
    capacity: number;
    table_code: string;
    is_active: boolean;
}

export class Merchant {
  id?: number;
  admin_id: number;
  name: string;
  desc: string;
  is_table_service: boolean;
  menu_cats: MenuCat[];
  products?: Product[];
  merchant_tables?: MerchantTable[];

  constructor(
    admin_id: number,
    name: string,
    desc: string,
    is_table_service: boolean,
    menu_cats: MenuCat[],
    products?: Product[],
    merchant_tables?: MerchantTable[],
    id?: number 
  ) {
    this.admin_id = admin_id;
    this.name = name;
    this.desc = desc;
    this.is_table_service = is_table_service;
    this.menu_cats = menu_cats;
    this.products = products;
    this.merchant_tables = merchant_tables;
    this.id = id;
  } 
}
