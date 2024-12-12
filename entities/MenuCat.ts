import { Product } from "./Product";

export class MenuCat {
  id: number;
  name: string;
  desc: string;
  order: number;
  icon: string;
  products: Product[];

  constructor(
    id: number,
    name: string,
    desc: string,
    order: number,
    icon: string,
    products: Product[]
  ) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.order = order;
    this.icon = icon;
    this.products = products;
  }
}
