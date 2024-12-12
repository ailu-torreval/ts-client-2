export interface ProductOption {
  id: number;
  name: string;
  desc: string;
  price: number;
}

export interface ProductExtra {
  id: number;
  name: string;
  desc: string;
  price: number;
}

export class Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  offer_price: number;
  is_offer: boolean;
  has_options: boolean;
  highlight_txt: string;
  is_suggestion: boolean;
  option_title?: string;
  options?: ProductOption[];
  extras?: ProductExtra[];

  constructor(
    id: number,
    name: string,
    desc: string,
    price: number,
    offer_price: number,
    is_offer: boolean,
    has_options: boolean,
    highlight_txt: string,
    is_suggestion: boolean,
    options?: ProductOption[],
    extras?: ProductExtra[],
    option_title?: string
  ) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.offer_price = offer_price;
    this.is_offer = is_offer;
    this.has_options = has_options;
    this.highlight_txt = highlight_txt;
    this.is_suggestion = is_suggestion;
    this.option_title = option_title;
    this.options = options;
    this.extras = extras;
  }
}
